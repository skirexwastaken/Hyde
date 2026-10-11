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

import fs from "node:fs"
import path from "node:path"

import {scriptDirectory} from "../../../../constants/paths.js"

import {compileFractalCode} from "./compileFractalCode.js"

export const extractFractal = {
    extractFractal(rawMarkdown, filename) {
        // Extracting fractal code
        let fractalCode = []
        let inputArguments = {}

        rawMarkdown = rawMarkdown.replace(/<!==([\s\S]*?)===>|\$\{(\S*?)\}|<input type="text" name="(\S*?)">/g, (match, codeBlock, variableName, variableInput) => {
            let codeLine = ""
            let definingString  = false

            if (match.startsWith("<!==")) {
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
                if (variableName) {
                    inputArguments[variableName] = ""

                } else {
                    inputArguments[variableInput] = ""

                }

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