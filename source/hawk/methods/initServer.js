import http2 from "node:http2"
import path from "node:path"
import fs from "node:fs"
import querystring from "node:querystring"

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
            rejectUnauthorized: false,

            allowHTTP1: true

        }

        const server = http2.createSecureServer(options)

        server.on('stream', async (stream, headers) => {
            let status, contentType, content
            const method = headers[":method"]

            switch (method) {
                case "GET":
                case "POST": {

                    let postArguments
                    if (method == "POST") {
                        postArguments = await new Promise((resolve) => {
                            let streamData = ""

                            stream.on("data", (chunk) => {
                                streamData += chunk

                            })

                            stream.on("end", () => {
                                resolve(querystring.parse(streamData))

                            })
                        })
                    }

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
                                status = 404
                                contentType = "text/html"
                                content = "<h1>Not Found</h1>"

                                console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${cssFilePath}`)

                            } else {
                                const stats = getStats(cssFilePath)

                                if (stats) {
                                    if (!(filename in this.loCache.cssRouteMap)) {
                                        this.loCache.cacheCss(filename, stats)

                                    }

                                    status = 200
                                    contentType = "text/css"
                                    content = this.loCache.getFile(filename, "css", stats)

                                    console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${filename}`)

                                } else {
                                    status = 404
                                    contentType = "text/html"
                                    content = "<h1>Not Found</h1>"

                                    console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${filename}`)

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

                            // For example route /index is missing the .html extension
                            if (extension == undefined) {
                                extension = "html"

                            }

                            // When requesting a HTML file, the file is firstly loaded together with Fractal code associated with it
                            // Then the Fractal code is executed, code blocks inside of the HTML file are replaced with print output of the code that's located there
                            // Finally, variables embeded inside of text are resolved

                            const markdownFilePath = path.resolve(markdownDirectory, `${route}.md`)

                            // Anti directory traversal check
                            if (!(markdownFilePath.startsWith(markdownDirectory))) {
                                status = 404
                                contentType = "text/html"
                                content = "<h1>Not Found</h1>"

                                console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${markdownFilePath}`)

                            } else {
                                const stats = getStats(markdownFilePath)

                                if (stats) {
                                    if (!(route in this.loCache.markdownRouteMap)) {
                                        this.loCache.cacheMarkdown(route, stats)

                                    }

                                    let [htmlFile, fractalBytecode] = this.loCache.getFile(route, "markdown", stats)

                                    status = 200
                                    contentType = "text/html"

                                    if (fractalBytecode.length != 0) {
                                        if (postArguments){
                                            for (const fractalBytecodeIndex in fractalBytecode) {
                                                for (const variableName in fractalBytecode[fractalBytecodeIndex][1]) {
                                                    if (variableName in postArguments) {
                                                        fractalBytecode[fractalBytecodeIndex][1][variableName] = postArguments[variableName]

                                                    }
                                                }
                                            }
                                        }

                                        content = await this.workerPool.runTask({htmlFile: htmlFile, fractalBytecode: fractalBytecode})

                                    } else {
                                        content = htmlFile

                                    }

                                    console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${route}.md`)

                                } else {
                                    status = 404
                                    contentType = "text/html"
                                    content = "<h1>Not Found</h1>"

                                    console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${route}.md`)

                                }
                            }

                            break

                        }

                        // Ico Files
                        case "ico": {
                            const filename = `${route}.ico`
                            const iconFilePath = path.resolve(iconDirectory, filename)

                            // Anti directory traversal check
                            if (!(iconFilePath.startsWith(iconDirectory))) {
                                status = 404
                                contentType = "text/html"
                                content = "<h1>Not Found</h1>"

                                console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${iconFilePath}`)

                            } else {
                                const stats = getStats(iconFilePath)

                                if (stats) {
                                    if (!(filename in this.loCache.iconRouteMap)) {
                                        this.loCache.cacheIcon(filename, stats)

                                    }

                                    status = 200
                                    contentType = "image/x-icon"
                                    content = this.loCache.getFile(filename, "ico", stats)

                                    console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${filename}`)

                                } else {
                                    status = 404
                                    contentType = "text/html"
                                    content = "<h1>Not Found</h1>"

                                    console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${filename}`)

                                }
                            }

                            break

                        }

                        // Image Files
                        case "png": {
                            const filename = `${route}.${extension}`
                            const imageFilePath = path.resolve(imageDirectory, filename)

                            // Anti directory traversal check
                            if (!(imageFilePath.startsWith(imageDirectory))) {
                                status = 404
                                contentType = "text/html"
                                content = "<h1>Not Found</h1>"

                                console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${imageFilePath}`)

                            } else {
                                const stats = getStats(imageFilePath)

                                if (stats) {
                                    if (!(filename in this.loCache.imageRouteMap)) {
                                        this.loCache.cacheImage(filename, stats)

                                    }

                                    status = 200
                                    contentType = `image/${extension}`
                                    content = this.loCache.getFile(filename, "image", stats)

                                    console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${filename}`)

                                } else {
                                    status = 404
                                    contentType = "text/html"
                                    content = "<h1>Not Found</h1>"

                                    console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${filename}`)

                                }
                            }

                            break
                        }

                        // Unsupported Files
                        default: {
                            status = 404
                            contentType = "text/html"
                            content = "<h1>Not Found</h1>"

                            // The files in the array bellow are common targets for bots trying to abuse legacy webserver vulnerabilities
                            if (["php", "env", "json", "git", "db"].includes(extension)) {
                                console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested a ${extension} file named ${route}.${extension}`)
                                console.info("[Hawk] [WARNING] This could potentially be an attempt at trying to abuse common web server vulnerabilities")
                                console.info("[HAWK] [WARNING] Such as trying to request admin.php or .env file containing passwords")
                                console.info("[Hawk] [WARNING] Note that those vulnerabilities are not present in Hyde")

                            } else {
                                console.info(`[Hawk] [Warning] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${route}.${extension}`)

                            }
                        }
                    }

                    break

                }

                default: {
                    status = 404
                    contentType = "text/html"
                    content = "<h1>Not Found</h1>"

                    console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to use ${method} method which is not used in Hyde`)

                    break

                }
            }

            // One single stream for all cases
            if (!(stream.destroyed || stream.closed) && stream.writable) {
                stream.respond({
                    ":status": status,
                    "content-type": contentType,

                })

                stream.end(content)

            }
        })

        return server

    }
}