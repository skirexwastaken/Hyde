import fs from "node:fs"
import path from "node:path"

import {scriptsDirectory} from "../constants/paths.js"

export const extractFractal = {
    extractFractal(rawMarkdown, filename) {
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

        return rawMarkdown
    }
}