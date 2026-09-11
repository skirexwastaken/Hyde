import http from "http"

import fs from "node:fs"
import path from "node:path"

import {markdownDirectory, stylesDirectory} from "../../../constants/paths.js";

// The core of the entire Hyde project, a webserver written using the http Node module
export const initServer = {
    initServer() {
        this.server = http.createServer((request, result) => {

            // Removes the / at the start
            let route = request.url.slice(1)

            // CSS File
            if (route.endsWith(".css")) {
                const cssFilePath = path.resolve(stylesDirectory, route)

                if (fs.existsSync(cssFilePath)) {
                    this.loCache.cacheCss(route);

                    const cssFile = this.loCache.getCss(route)

                    result.statusCode = 200
                    result.setHeader('Content-Type', 'text/css')
                    result.end(cssFile)
                
                } else {
                    result.statusCode = 404
                    result.setHeader('Content-Type', 'text/css')
                    result.end("")

                }
            
            // HTML File
            } else if (route.endsWith(".html") || !(route.includes("."))) {
                route = route.replace(".html","")

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

            // Unsupported File
            } else {
                result.statusCode = 404
                result.setHeader('Content-Type', 'text/html')
                result.end("<h1>404 Not Found</h1>")

            }
        })
    }
}