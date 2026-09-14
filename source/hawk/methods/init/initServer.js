import http from "http"

import fs from "node:fs"
import path from "node:path"

import {markdownDirectory, stylesDirectory, iconDirectory, imageDirectory} from "../../../constants/paths.js"

import {Worker} from "node:worker_threads"

// The core of the entire Hyde project, a webserver written using the http Node module
export const initServer = {
    initServer() {
        this.server = http.createServer((request, result) => {

            // Removes the / at the start
            const extension = path.extname(request.url).slice(1)
            let route = request.url.slice(1)

            if (extension != "") {
                route = route.slice(0, -(extension.length + 1))

            }

            switch (extension) {

                // CSS Files
                case "css": {
                    const filename = `${route}.css`
                    const cssFilePath = path.resolve(stylesDirectory, filename)

                    // Anti directory traversal check
                    if (!(cssFilePath).startsWith(stylesDirectory)) {
                            result.statusCode = 404
                            result.setHeader('Content-Type', 'text/css')
                            result.end("")

                            console.log(`[Hawk] [WARNING] Origin ${request.socket.remoteAddress} has tried to traverse directories with the following path ${cssFilePath}`)

                    } else {
                        if (fs.existsSync(cssFilePath)) {
                            this.loCache.cacheCss(filename);

                            const cssFile = this.loCache.getFile(filename, "css")

                            result.statusCode = 200
                            result.setHeader('Content-Type', 'text/css')
                            result.end(cssFile)

                            console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested file named ${filename}`)
                        
                        } else {
                            result.statusCode = 404
                            result.setHeader('Content-Type', 'text/css')
                            result.end("")

                            console.log(`[Hawk] [WARNING] Origin ${request.socket.remoteAddress} has requested invalid file named ${filename}`)

                        }
                    }

                    break

                } 

                // HTML Files
                case "html":
                case "": {
                    // The route / results to index.html
                    if (route == "") {
                        route = "index"

                    }

                    if (extension == undefined) {
                        extension = "html"

                    }

                    // When requesting a HTML file, the file is firstly loaded together with Fractal code associated with it
                    // Then the Fractal code is executed, code blocks inside of the HTML file are replaced with print output of the code that's located there
                    // Finally, variables embeded inside of text are resolved

                    const markdownFilePath = path.resolve(markdownDirectory, `${route}.md`)

                    // Anti directory traversal check
                    if (!(markdownFilePath.startsWith(markdownDirectory))) {
                            result.statusCode = 404
                            result.setHeader('Content-Type', 'text/html')
                            result.end("")

                            console.log(`[Hawk] [WARNING] Origin ${request.socket.remoteAddress} has tried to traverse directories with the following path ${markdownFilePath}`)

                    } else {
                        if (fs.existsSync(markdownFilePath)) {
                            this.loCache.cacheMarkdown(route)

                            let htmlFile = this.loCache.getFile(route, "html").split('\n')

                            const fractalBytecode = this.loCache.getFile(route, "bytecode")
                            
                            const worker = new Worker("./source/hawk/methods/assembleResponse.js", {workerData: {htmlFile: htmlFile, fractalBytecode: fractalBytecode }})

                            worker.on('message', (htmlFile) => {
                                result.statusCode = 200
                                result.setHeader('Content-Type', 'text/html')
                                result.end(htmlFile)
                            })

                            worker.on('error', (error) => {
                                result.statusCode = 404
                                result.setHeader('Content-Type', 'text/html')
                                result.end("<h1>404 Not Found</h1>")

                                console.error(`[Hawk] Worker has run into an error '${error}'`)

                            })

                            console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested file named ${route}.md`)

                        } else {
                            result.statusCode = 404
                            result.setHeader('Content-Type', 'text/html')
                            result.end("<h1>404 Not Found</h1>")

                            console.log(`[Hawk] [WARNING] Origin ${request.socket.remoteAddress} has requested invalid file named ${route}.md`)

                        }
                    }

                    break

                }

                case "ico": {
                    const filename = `${route}.ico`
                    const iconFilePath = path.resolve(iconDirectory, filename)

                    // Anti directory traversal check
                    if (!(iconFilePath.startsWith(iconDirectory))) {
                            result.statusCode = 404
                            result.setHeader('Content-Type', 'image/x-icon')
                            result.end("")

                            console.log(`[Hawk] [WARNING] Origin ${request.socket.remoteAddress} has tried to traverse directories with the following path ${iconFilePath}`)

                    } else {
                        if (fs.existsSync(iconFilePath)) {
                            this.loCache.cacheIcon(filename)

                            const iconFile = this.loCache.getFile(filename, "ico")

                            result.statusCode = 200
                            result.setHeader('Content-Type', 'image/x-icon')
                            result.end(iconFile)

                            console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested file named ${filename}`)
                        
                        } else {
                            result.statusCode = 404
                            result.setHeader('Content-Type', 'image/x-icon')
                            result.end("")

                            console.log(`[Hawk] [WARNING] Origin ${request.socket.remoteAddress} has requested invalid file named ${filename}`)

                        }
                    }

                    break

                }

                case "png": {
                    const filename = `${route}.${extension}`
                    const imageFilePath = path.resolve(imageDirectory, filename)

                    // Anti directory traversal check
                    if (!(imageFilePath.startsWith(imageDirectory))) {
                            result.statusCode = 404
                            result.setHeader('Content-Type', `image/${extension}`)
                            result.end("")

                            console.log(`[Hawk] [WARNING] Origin ${request.socket.remoteAddress} has tried to traverse directories with the following path ${imageFilePath}`)

                    } else {
                        if (fs.existsSync(imageFilePath)) {
                            this.loCache.cacheImage(filename)

                            const imageFile = this.loCache.getFile(filename, "image")

                            result.statusCode = 200
                            result.setHeader('Content-Type', `image/${extension}`)
                            result.end(imageFile)

                            console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested file named ${filename}`)
                        
                        } else {
                            result.statusCode = 404
                            result.setHeader('Content-Type', `image/${extension}`)
                            result.end("")

                            console.log(`[Hawk] [WARNING] Origin ${request.socket.remoteAddress} has requested invalid file named ${filename}`)

                        }
                    }

                    break
                }

                // Unsupported Files
                default: {
                    result.statusCode = 404
                    result.setHeader('Content-Type', 'text/html')
                    result.end("<h1>404 Not Found</h1>")

                    // The files in the array bellow are common targets for bots trying to abuse legacy webserver vulnerabilities
                    if (["php", "env", "json", "git", "db"].includes(extension)) {
                        console.log(`[Hawk] [WARNING] Origin ${request.socket.remoteAddress} has requested a ${extension} file named ${route}.${extension}`)
                        console.log("[Hawk] [WARNING] This could potentially be an attempt at trying to abuse common web server vulnerabilities")
                        console.log("[HAWK] [WARNING] Such as trying to request admin.php or .env file containing passwords")
                        console.log("[Hawk] [WARNING] Note that those vulnerabilities are not present in Hyde")

                    } else {
                        console.log(`[Hawk] [Warning] Origin ${request.socket.remoteAddress} has requested invalid file named ${route}.${extension}`)

                    }
                }
            }
        })
    }
}