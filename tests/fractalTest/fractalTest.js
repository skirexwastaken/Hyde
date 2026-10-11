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
import {fileURLToPath} from "node:url"

import {Fractal} from "../../source/fractal/fractal.js"

const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.resolve(currentDirectory, "./testCases.jsonc")
const fileContent = fs.readFileSync(filePath, "utf-8").replace(/\/\*([\s\S]*?)\*\//g, (string, match) => {
    return ""

})

const testCases = JSON.parse(fileContent)

const totalTests = testCases.length

console.info(`[Fractal] Test utility is starting`)

for (const testIndex in testCases) {
    const [testCode, testOutput] = testCases[testIndex]

    try {

        const fractalInstance = new Fractal({"compiler": true, "interpreter": true}, {})

        const [instructionSets, metaData] = fractalInstance.compile(testCode)

        const [outputArguments, shellOutputBuffer] =  fractalInstance.interpreter(instructionSets, metaData)

        if (JSON.stringify(shellOutputBuffer) != JSON.stringify(testOutput)){
            console.error(`[Fractal] Failed at test (${Number(testIndex) + 1}/${totalTests})`)
            console.error(`[Fractal] Expected output buffer: ${testOutput}`)
            console.error(`[Fractal] Received output buffer: ${shellOutputBuffer}`)

            break

        }

    } catch (error) {
        console.error(`[Fractal] Failed at test (${Number(testIndex) + 1}/${totalTests})`)
        console.error(error.message)

        break

    }

    console.info(`[Fractal] Finished test (${Number(testIndex) + 1}/${totalTests})`)

    if ((Number(testIndex) + 1) == totalTests) console.info(`[Fractal] All tests have passed successfully`)
}