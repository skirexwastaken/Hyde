import http2 from "node:http2"
import path from "node:path"
import fs from "node:fs"

import {markdownDirectory, stylesDirectory, iconDirectory, imageDirectory, certificatesDirectory} from "../../constants/paths.js"
import {getStats} from "../../constants/macros.js"
// The core of the entire Hyde project, a webserver written using the http Node module
export const initServer = {
    initServer() {
        const serverKeyPath = path.resolve(certificatesDirectory, "privateKey.pem")
        const serverKey = fs.readFileSync(serverKeyPath)

        const serverCertificatePath = path.resolve(certificatesDirectory, "publicCertificate.pem")
        const serverCertificate = fs.readFileSync(serverCertificatePath)

        const options = {
            key: serverKey,
            cert: serverCertificate,

            requestCert: true,
            rejectUnauthorized: false

        }

        const server = http2.createSecureServer(options)

        server.on('stream', async (stream, headers) => {

            // Removes the / at the start
            const extension = path.extname(headers[':path']).slice(1)
            let route = headers[':path'].slice(1)

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
                            stream.respond({
                                ":status": 404,
                                "content-type": "text/html"

                            })

                            stream.end("<h1>Not Found</h1>")

                            console.log(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${cssFilePath}`)

                    } else {
                        const stats = getStats(cssFilePath)

                        if (filename in this.loCache.cssRouteMap){
                            const cssFile = this.loCache.getFile(filename, "css", stats)

                            stream.respond({
                                ":status": 200,
                                "content-type": "text/css"

                            })

                            stream.end(cssFile)

                            console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${filename}`)

                        } else if (stats) {
                            this.loCache.cacheCss(filename, stats);

                            const cssFile = this.loCache.getFile(filename, "css", stats)

                            stream.respond({
                                ":status": 200,
                                "content-type": "text/css"

                            })

                            stream.end(cssFile)

                            console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${filename}`)
                        
                        } else {
                            stream.respond({
                                ":status": 404,
                                "content-type": "text/html"

                            })

                            stream.end("<h1>Not Found</h1>")

                            console.log(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${filename}`)

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
                            stream.respond({
                                ":status": 404,
                                "content-type": "text/html"

                            })

                            stream.end("<h1>Not Found</h1>")

                            console.log(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${markdownFilePath}`)

                    } else {
                        const stats = getStats(markdownFilePath)

                        if (route in this.loCache.markdownRouteMap) {
                            const [htmlFile, fractalBytecode] = this.loCache.getFile(route, "markdown", stats)
                            
                            const htmlResponse = await this.workerPool.runTask({htmlFile: htmlFile, fractalBytecode: fractalBytecode})

                            stream.respond({
                                ":status": 200,
                                "content-type": "text/html"

                            })

                            stream.end(htmlResponse)

                            console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${route}.md`)

                        } else if (stats) {
                            this.loCache.cacheMarkdown(route, stats)

                            const [htmlFile, fractalBytecode] = this.loCache.getFile(route, "markdown", stats)
                            
                            const htmlResponse = await this.workerPool.runTask({htmlFile: htmlFile, fractalBytecode: fractalBytecode})

                            stream.respond({
                                ":status": 200,
                                "content-type": "text/html"

                            })

                            stream.end(htmlResponse)

                            console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${route}.md`)

                        } else {
                            stream.respond({
                                ":status": 404,
                                "content-type": "text/html"

                            })

                            stream.end("<h1>Not Found</h1>")

                            console.log(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${route}.md`)

                        }
                    }

                    break

                }

                case "ico": {
                    const filename = `${route}.ico`
                    const iconFilePath = path.resolve(iconDirectory, filename)

                    // Anti directory traversal check
                    if (!(iconFilePath.startsWith(iconDirectory))) {
                            stream.respond({
                                ":status": 404,
                                "content-type": "text/html"

                            })

                            stream.end("<h1>Not Found</h1>")

                            console.log(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${iconFilePath}`)

                    } else {
                        const stats = getStats(iconFilePath)

                        if (filename in this.loCache.iconRouteMap) {
                            const iconFile = this.loCache.getFile(filename, "ico", stats)

                            stream.respond({
                                ":status": 200,
                                "content-type": "image/x-icon"

                            })

                            stream.end(iconFile)

                            console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${filename}`)

                        } else if (stats) {
                            this.loCache.cacheIcon(filename, stats)

                            const iconFile = this.loCache.getFile(filename, "ico", stats)

                            stream.respond({
                                ":status": 200,
                                "content-type": "image/x-icon"

                            })

                            stream.end(iconFile)

                            console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${filename}`)
                        
                        } else {
                            stream.respond({
                                ":status": 404,
                                "content-type": "text/html"

                            })

                            stream.end("<h1>Not Found</h1>")

                            console.log(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${filename}`)

                        }
                    }

                    break

                }

                case "png": {
                    const filename = `${route}.${extension}`
                    const imageFilePath = path.resolve(imageDirectory, filename)

                    // Anti directory traversal check
                    if (!(imageFilePath.startsWith(imageDirectory))) {
                            stream.respond({
                                ":status": 404,
                                "content-type": "text/html"

                            })

                            stream.end("<h1>Not Found</h1>")

                            console.log(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${imageFilePath}`)

                    } else {
                        const stats = getStats(imageFilePath)
                        
                        if (filename in this.loCache.imageRouteMap) {
                            const imageFile = this.loCache.getFile(filename, "image", stats)

                            stream.respond({
                                ":status": 200,
                                "content-type": `image/${extension}`

                            })

                            stream.end(imageFile)

                            console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${filename}`)

                        } else if (stats) {
                            this.loCache.cacheImage(filename, stats)

                            const imageFile = this.loCache.getFile(filename, "image", stats)

                            stream.respond({
                                ":status": 200,
                                "content-type": `image/${extension}`

                            })

                            stream.end(imageFile)

                            console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${filename}`)
                        
                        } else {
                            stream.respond({
                                ":status": 404,
                                "content-type": "text/html"

                            })

                            stream.end("<h1>Not Found</h1>")

                            console.log(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${filename}`)

                        }
                    }

                    break
                }

                // Unsupported Files
                default: {
                    stream.respond({
                        ":status": 404,
                        "content-type": "text/html"
                    })

                    stream.end("<h1>Not Found</h1>")

                    // The files in the array bellow are common targets for bots trying to abuse legacy webserver vulnerabilities
                    if (["php", "env", "json", "git", "db"].includes(extension)) {
                        console.log(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested a ${extension} file named ${route}.${extension}`)
                        console.log("[Hawk] [WARNING] This could potentially be an attempt at trying to abuse common web server vulnerabilities")
                        console.log("[HAWK] [WARNING] Such as trying to request admin.php or .env file containing passwords")
                        console.log("[Hawk] [WARNING] Note that those vulnerabilities are not present in Hyde")

                    } else {
                        console.log(`[Hawk] [Warning] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${route}.${extension}`)

                    }
                }
            }
        })

        return server

    }
}