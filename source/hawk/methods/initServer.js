import http from "http"

import fs from "node:fs"
import path from "node:path"

import {markdownDirectory} from "../constants/paths.js";

import {Fractal} from "../../fractal/fractal.js"
import { getInputArguments } from "../../loCache/methods/getInputArguments.js";

export const initServer = {
    initServer() {
        this.server = http.createServer((request, result) => {
            if (request.url.endsWith(".css")) {
                

            } else {
                
                let route = request.url.slice(1)

                console.log(`[Hawk] Processing request at route /${route}`)

                if (route == "") route = "index"

                const fullPath = path.resolve(markdownDirectory, `${route}.md`)

                let htmlFile

                if (fs.existsSync(fullPath)) {
                    // Caching all files
                    this.loCache.cacheFiles(route)

                    // Getting the HTML file from cache
                    htmlFile = this.loCache.getHtml(route)

                } else {
                    // Caching all files
                    this.loCache.cacheFiles("error")

                    // Getting the HTML file from cache
                    htmlFile = this.loCache.getHtml("error")
                }

                const fractalBytecode = this.loCache.getBytecode(route)
                const fractalInputArguments = this.loCache.getInputArguments(route)

                let fractalBytecodeIndex = 0
                let currentOutputArguments

                for (let htmlLineIndex = 0; htmlLineIndex < htmlFile.length; htmlLineIndex ++) {

                    htmlFile[htmlLineIndex] = htmlFile[htmlLineIndex].replace(/<!==#===>/, (match) => {
                        const fractalInstance = new Fractal(fractalInputArguments)

                        const [instructionSets, metaData] = fractalBytecode[fractalBytecodeIndex++]

                        const [outputArguments, shellOutputBuffer] =  fractalInstance.interpreter(instructionSets, metaData)

                        currentOutputArguments = outputArguments

                        let htmlLines = ""

                        for (const line of shellOutputBuffer) {
                            htmlLines += `<p>${line}</p>`

                        }
                
                        return htmlLines
                    })

                    htmlFile[htmlLineIndex] = htmlFile[htmlLineIndex].replace(/\$\[(\S*?)\]/g, (match, variableName) => {
                        if (variableName in currentOutputArguments) {
                            return currentOutputArguments[variableName]

                        } else {
                            return ""

                        }
                    })
                    
                }

                result.statusCode = 200
                result.setHeader('Content-Type', 'text/html')
                result.end(htmlFile.join(""))
            }
        })
    }
}