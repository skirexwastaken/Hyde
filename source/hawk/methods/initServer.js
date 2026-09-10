import http from "http"

import fs from "node:fs"
import path from "node:path"

import {markdownDirectory} from "../constants/paths.js";
import {stylesDirectory} from "../constants/paths.js";

import {Fractal} from "../../fractal/fractal.js"

export const initServer = {
    initServer() {
        this.server = http.createServer((request, result) => {
            if (request.url.endsWith(".css")) {
                let route = request.url.slice(1)

                const fullPath = path.resolve(stylesDirectory, route)

                if (fs.existsSync(fullPath)) {
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

            } else {
                
                let route = request.url.slice(1)

                if (route == "") route = "index"

                const fullPath = path.resolve(markdownDirectory, `${route}.md`)

                let htmlFile

                if (!(fs.existsSync(fullPath))) {
                    result.statusCode = 404
                    result.setHeader('Content-Type', 'text/html')
                    result.end("<h1>404 Not Found</h1>")

                } else {
                    // Caching all files
                    this.loCache.cacheFiles(route)

                    // Getting the HTML file from cache
                    htmlFile = this.loCache.getHtml(route).split('\n')

                    const fractalBytecode = this.loCache.getBytecode(route)

                    let fractalBytecodeIndex = 0
                    let allOutputArguments = {}

                    for (let htmlLineIndex = 0; htmlLineIndex < htmlFile.length; htmlLineIndex ++) {

                        htmlFile[htmlLineIndex] = htmlFile[htmlLineIndex].replace(/<!==#===>/, (match) => {
                            const [bytecode, inputArguments] = fractalBytecode[fractalBytecodeIndex++]

                            const fractalInstance = new Fractal(inputArguments)

                            const [instructionSets, metaData] = bytecode

                            const [outputArguments, shellOutputBuffer] =  fractalInstance.interpreter(instructionSets, metaData)

                            for (const outputArgument in outputArguments) {
                                allOutputArguments[outputArgument] = outputArguments[outputArgument]

                            }


                            let htmlLines = ""

                            for (const line of shellOutputBuffer) {
                                htmlLines += `<p>${line}</p>`

                            }
                    
                            return htmlLines
                        })
                    
                    }

                    for (let htmlLineIndex = 0; htmlLineIndex < htmlFile.length; htmlLineIndex ++) {
                        htmlFile[htmlLineIndex] = htmlFile[htmlLineIndex].replace(/\$\[(\S*?)\]/g, (match, variableName) => {
                            return allOutputArguments[variableName]
                            
                        })
                    }

                    result.statusCode = 200
                    result.setHeader('Content-Type', 'text/html')
                    result.end(htmlFile.join(""))
                }
            }
        })
    }
}