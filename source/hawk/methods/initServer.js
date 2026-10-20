/*
GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2026 Daniel Hora

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

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
                            const cssFilePath = path.resolve(stylesDirectory, `${route}.css`)

                            // Anti directory traversal check
                            if (!(cssFilePath).startsWith(stylesDirectory)) {
                                status = 404
                                contentType = "text/html"
                                content = "<h1>Not Found</h1>"

                                console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${cssFilePath}`)

                            } else {
                                const stats = getStats(cssFilePath)

                                if (stats) {
                                    if (!(route in this.loCache.cssRouteMap)) {
                                        this.loCache.cacheCss(route, stats)

                                    }

                                    status = 200
                                    contentType = "text/css"
                                    content = this.loCache.getFile(route, "css", stats)

                                    console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${route}.css`)

                                } else {
                                    status = 404
                                    contentType = "text/html"
                                    content = "<h1>Not Found</h1>"

                                    console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${route}.css`)

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

                                            // Making a clone of the fractalBytecode so the postArguments don't end up in cache
                                            fractalBytecode = structuredClone(fractalBytecode)

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
                            const iconFilePath = path.resolve(iconDirectory, `${route}.ico`)

                            // Anti directory traversal check
                            if (!(iconFilePath.startsWith(iconDirectory))) {
                                status = 404
                                contentType = "text/html"
                                content = "<h1>Not Found</h1>"

                                console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${iconFilePath}`)

                            } else {
                                const stats = getStats(iconFilePath)

                                if (stats) {
                                    if (!(route in this.loCache.iconRouteMap)) {
                                        this.loCache.cacheIcon(route, stats)

                                    }

                                    status = 200
                                    contentType = "image/x-icon"
                                    content = this.loCache.getFile(route, "ico", stats)

                                    console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${route}.ico`)

                                } else {
                                    status = 404
                                    contentType = "text/html"
                                    content = "<h1>Not Found</h1>"

                                    console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${route}.ico`)

                                }
                            }

                            break

                        }

                        // Png Files
                        case "png": {
                            const imageFilePath = path.resolve(imageDirectory, `${route}.${extension}`)

                            // Anti directory traversal check
                            if (!(imageFilePath.startsWith(imageDirectory))) {
                                status = 404
                                contentType = "text/html"
                                content = "<h1>Not Found</h1>"

                                console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has tried to traverse directories with the following path ${imageFilePath}`)

                            } else {
                                const stats = getStats(imageFilePath)

                                if (stats) {
                                    if (!(route in this.loCache.imageRouteMap)) {
                                        this.loCache.cacheImage(route, stats)

                                    }

                                    status = 200
                                    contentType = `image/${extension}`
                                    content = this.loCache.getFile(route, "image", stats)

                                    console.log(`[Hawk] Origin ${stream.session.socket.remoteAddress} has requested file named ${route}.png`)

                                } else {
                                    status = 404
                                    contentType = "text/html"
                                    content = "<h1>Not Found</h1>"

                                    console.info(`[Hawk] [WARNING] Origin ${stream.session.socket.remoteAddress} has requested invalid file named ${route}.png`)

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