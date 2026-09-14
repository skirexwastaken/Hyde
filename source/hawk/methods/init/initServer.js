import http from "http"

import fs from "node:fs"
import path from "node:path"

import {markdownDirectory, stylesDirectory, iconDirectory, imageDirectory} from "../../../constants/paths.js"

// The core of the entire Hyde project, a webserver written using the http Node module
export const initServer = {
    initServer() {
        this.server = http.createServer((request, result) => {

            // Removes the / at the start
             let [route, extension] = request.url.slice(1).split(".")

            switch (extension) {

                // CSS Files
                case "css": {
                    const filename = `${route}.css`
                    const cssFilePath = path.resolve(stylesDirectory, filename)

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

                        console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested invalid file named ${filename}`)

                    }

                    break

                } 

                // HTML Files
                case "html":
                case undefined: {
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

                    if (fs.existsSync(markdownFilePath)) {
                        this.loCache.cacheMarkdown(route)

                        let htmlFile = this.loCache.getFile(route, "html").split('\n')

                        const fractalBytecode = this.loCache.getFile(route, "bytecode")

                        htmlFile = this.assembleResponse(htmlFile, fractalBytecode)

                        result.statusCode = 200
                        result.setHeader('Content-Type', 'text/html')
                        result.end(htmlFile)

                        console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested file named ${route}.md`)

                    } else {
                        result.statusCode = 404
                        result.setHeader('Content-Type', 'text/html')
                        result.end("<h1>404 Not Found</h1>")

                        console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested invalid file named ${route}.md`)

                    }

                    break

                }

                case "ico": {
                    const filename = `${route}.ico`
                    const iconFilePath = path.resolve(iconDirectory, filename)

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

                        console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested invalid file named ${filename}`)

                    }

                    break

                }

                case "png": {
                    const filename = `${route}.${extension}`
                    const imageFilePath = path.resolve(imageDirectory, filename)

                    if (fs.existsSync(imageFilePath)) {
                        this.loCache.cacheImage(filename)

                        const imageFile = this.loCache.getFile(filename, "image")

                        result.statusCode = 200
                        result.setHeader('Content-Type', 'image/x-icon')
                        result.end(imageFile)

                        console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested file named ${filename}`)
                    
                    } else {
                        result.statusCode = 404
                        result.setHeader('Content-Type', 'image/x-icon')
                        result.end("")

                        console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested invalid file named ${filename}`)

                    }

                    break
                }

                // Unsupported Files
                default: {
                    result.statusCode = 404
                    result.setHeader('Content-Type', 'text/html')
                    result.end("<h1>404 Not Found</h1>")

                    console.log(`[Hawk] Origin ${request.socket.remoteAddress} has requested invalid file named ${route}.${extension}`)

                    if (extension == "php") {
                        console.log(`[Hawk] [WARNING] Origin ${request.socket.remoteAddress} has requested a php file named ${route}.${extension}`)
                        console.log("[Hawk] [WARNING] This could potentially be an attempt at trying to abuse php vulnerabilities")
                        console.log("[HAWK] [WARNING] Such as trying to request passwords.php or admin.php which are not present")

                    }
                }
            }
        })
    }
}