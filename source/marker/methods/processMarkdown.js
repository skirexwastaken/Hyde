import fs from "node:fs"
import path from "node:path"

import {scriptsDirectory} from "../constants/paths.js"

export const processMarkdown = {
    // The main goal of this function is to simply determine where new lines should start
    processMarkdown(rawMarkdown, filename){
        // Removing comments and splitting the file content into separate lines
        rawMarkdown = rawMarkdown.replace(/<!--[\s\S]*?-->/g,"")

        // Extracting fractal code
        let fractalCode = []
        let inputArguments = {}

        rawMarkdown = rawMarkdown.replace(/<!==([\s\S]*?)===>|\$\[(\S*?)\]/g, (match, codeBlock, variableName) => {
            let codeLine = ""
            let definingString  = false

            if (match.startsWith("<")) {
                for (const symbol of codeBlock) {
                    if ((symbol != " " || definingString ) && (symbol != "\n" || definingString )) {
                        codeLine += symbol
                    }

                    if (symbol == "'") {
                        if (definingString  == true) {
                            definingString  = false

                        } else {
                            definingString  = true

                        }
                    }
                }

                fractalCode.push([codeLine, inputArguments])
                inputArguments = {}
        
                return "<!==#===>"

            } else {
                inputArguments[variableName] = ""

                return match
            }
        })

        filename = filename.replace(".md", ".fs")

        const fullPath = path.resolve(scriptsDirectory, filename)
        
        fs.writeFileSync(fullPath, JSON.stringify(fractalCode, null, 2), "utf-8")

        rawMarkdown = rawMarkdown.split("\n")

        // The symbol \ indicates a new line
        const splitMarkdown = []
        for (const line of rawMarkdown){
            if (line.endsWith("\\")){
                splitMarkdown.push(line.slice(0, -1))
                splitMarkdown.push("")

            } else {
                splitMarkdown.push(line)

            }
        }

        const processedMarkdown = []
        let insideCodeBlock = false
        let lineIndex = 0

        // Processing each line of markdown
        for (const line of splitMarkdown){

            // ``` indicates code block start or end
            // Note: No additional styles should be applied to lines inside of code block
            if (line.trim() == "```"){
                if (insideCodeBlock){
                    insideCodeBlock = false

                } else {
                    insideCodeBlock = true

                }

                processedMarkdown.push("```")

            } else {

                // If a line is not part of a code block, styles are applied
                if (!insideCodeBlock){

                    // First line is simply added to the proccessed markdown array
                    if (processedMarkdown.length == 0 && line != "") {
                        processedMarkdown.push(line)
                    
                    } else if (processedMarkdown.length != 0){

                        // Lines with no formating that don't have an empty line between each other are merged together on one line
                        if (splitMarkdown[lineIndex - 1] != "" && !["#","`","<",">","*"].includes(line[0]) && !["#","`","<",">","*"].includes(processedMarkdown[processedMarkdown.length - 1][0])){
                            processedMarkdown[processedMarkdown.length - 1] += ` ${line}`

                        } else {
                            if (line != ""){
                                processedMarkdown.push(line)

                            }
                        }
                    }
                
                // Line that's inside of a code block
                } else {
                    processedMarkdown.push(line)

                }
            }

            lineIndex++
        }

        return processedMarkdown
    }
}