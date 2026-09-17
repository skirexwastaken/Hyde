import fs from "node:fs"
import path from "node:path"

import {scriptDirectory} from "../../../../constants/paths.js"

import {compileFractalCode} from "./compileFractalCode.js"

export const extractFractal = {
    extractFractal(rawMarkdown, filename) {
        // Extracting fractal code
        let fractalCode = []
        let inputArguments = {}

        rawMarkdown = rawMarkdown.replace(/<!==([\s\S]*?)===>|\$\{(\S*?)\}/g, (match, codeBlock, variableName) => {
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

        const fractalBytecode = this.compileFractalCode(fractalCode, filename)

        const fractalBytecodeFilename = filename.replace(".md",".fsc")
        const fractalBytecodePath = path.resolve(scriptDirectory, fractalBytecodeFilename)

        fs.writeFileSync(fractalBytecodePath, JSON.stringify(fractalBytecode, null, process.env.BYTECODE_INDENTATION == "1" ? 2 : 0), "utf-8")

        return [rawMarkdown, fractalBytecode]
    }
}