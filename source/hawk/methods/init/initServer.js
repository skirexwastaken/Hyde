import http from "http"

import fs from "node:fs"
import path from "node:path"

import {markdownDirectory, stylesDirectory, iconDirectory} from "../../../constants/paths.js"

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

                        const cssFile = this.loCache.getCss(filename)

                        result.statusCode = 200
                        result.setHeader('Content-Type', 'text/css')
                        result.end(cssFile)
                    
                    } else {
                        result.statusCode = 404
                        result.setHeader('Content-Type', 'text/css')
                        result.end("")

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

                    // When requesting a HTML file, the file is firstly loaded together with Fractal code associated with it
                    // Then the Fractal code is executed, code blocks inside of the HTML file are replaced with print output of the code that's located there
                    // Finally, variables embeded inside of text are resolved

                    const markdownFilePath = path.resolve(markdownDirectory, `${route}.md`)

                    if (fs.existsSync(markdownFilePath)) {
                        this.loCache.cacheHtml(route)

                        let htmlFile = this.loCache.getHtml(route).split('\n')

                        const fractalBytecode = this.loCache.getBytecode(route)

                        htmlFile = this.assembleResponse(htmlFile, fractalBytecode)

                        result.statusCode = 200
                        result.setHeader('Content-Type', 'text/html')
                        result.end(htmlFile)

                    } else {
                        result.statusCode = 404
                        result.setHeader('Content-Type', 'text/html')
                        result.end("<h1>404 Not Found</h1>")

                    }

                    break

                }

                case "ico": {
                    const filename = `${route}.ico`
                    const iconFilePath = path.resolve(iconDirectory, filename)

                    if (fs.existsSync(iconFilePath)) {
                        this.loCache.cacheIcon(filename)

                        const iconFile = this.loCache.getIcon(filename)

                        result.statusCode = 200
                        result.setHeader('Content-Type', 'image/x-icon')
                        result.end(iconFile)
                    
                    } else {
                        result.statusCode = 404
                        result.setHeader('Content-Type', 'image/x-icon')
                        result.end("")

                    }

                    break

                }

                // Unsupported Files
                default:
                    result.statusCode = 404
                    result.setHeader('Content-Type', 'text/html')
                    result.end("<h1>404 Not Found</h1>")

            }
        })
    }
}