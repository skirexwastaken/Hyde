import {Fractal} from "../source/fractal/fractal.js"

// Silencing the debug prints from Fractal as they are not needed here
console.log = function() {

}

// Individual tests that will be ran
const testCases = [
    "main [print('Hello World!')]"
]

// Expected output buffers of the individual tests
// These are the core of the utlity since unexpected behaviour doesn't have to crash Fractal
const expectedOutputBuffers = [
    ['Hello World!']
]

const totalTests = testCases.length

console.info(`[Fractal] Test utility is starting`)

for (const testIndex in testCases) {
    try {

        const fractalInstance = new Fractal({})

        const [instructionSets, metaData] = fractalInstance.compile(testCases[testIndex])

        const [outputArguments, shellOutputBuffer] =  fractalInstance.interpreter(instructionSets, metaData)

        if (JSON.stringify(shellOutputBuffer) != JSON.stringify(expectedOutputBuffers[testIndex])){
            console.error(`[Fractal] Failed at test (${Number(testIndex) + 1}/${totalTests})`)
            console.error(`[Fractal] Expected output buffer: ${expectedOutputBuffers[testIndex]}`)
            console.error(`[Fractal] Received output buffer: ${shellOutputBuffer}`)

            break

        }

    } catch (error) {
        console.error(`[Fractal] Failed at test (${Number(testIndex) + 1}/${totalTests})`)
        console.error(error.message)

        break

    }

    console.info(`[Fractal] Finished test (${Number(testIndex) + 1}/${totalTests})`)

}

console.info(`[Fractal] All tests have passed successfully`)