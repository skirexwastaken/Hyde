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