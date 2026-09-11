import fs from "node:fs"
import path from "node:path"

import {scriptDirectory} from "../../constants/paths.js"

import {compileFractalCode} from "../../loCache/methods/compileFractalCode.js"

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

        const fractalbytecode = compileFractalCode.compileFractalCode(fractalCode)

        const filenameA = filename.replace(".md",".fsc")

        const fullPathA = path.resolve(scriptDirectory, filenameA)

        fs.writeFileSync(fullPathA, JSON.stringify(fractalbytecode, null, 2), "utf-8")

        return [rawMarkdown, fractalCode]
    }
}