import {Fractal} from "../source/fractal/fractal.js"

// Silencing the debug prints from Fractal as they are not needed here
/*console.log = function() {

}*/

// Individual tests that will be ran
const testCases = [
/* 1 */ "main [print('Hello World!')]", 
        "main [print(1), print(2), print(3)]",
    "main [print('This message will be cleared'), clear()]",
    "main [print(add(add(5, 5),add(10, 10)))]",
    "main [print(add(sub(10, 10), 5))]",
    "main [print(div(10,5), div(15, 3))]",
    "main [print(inc(10), inc(5))]",
    "main [print(dec(0), dec(6))]",
    "main [print(pow(2, 2), pow(3, 3))]",
    "main [print(sqrt(4), sqrt(9))]",
    "main [print(abs(-10), abs(5))]",
    "main [print(eval('100 + 100 - 50 * 2'))]",
    "main [print(eval('100 / 2 - 50 * 2'))]",
    "main [print(min(-10, -5, 15, -20, 3, 5))]",
    "main [print(max(-10, -5, 15, -20, 3, 5))]",
    "main [print(sum(10, 5, 10, 3, 5))]",
    "main [print(average(100, 50, 100, 50))]",
    "main [print(true())]",
    "main [print(false())]",
    "main [print(none())]",
    "main [print(eq(1, true()))]",
    "main [print(eq(0, false()))]",
    "main [print(gt(10, 5))]",
    "main [print(gt(50, 20))]",
    "main [print(gt(5, 16))]",
    "main [print(lt(10, 20))]",
    "main [print(lt(20, 5))]",
    "main [print(and(true(), 10))]",
    "main [print(and(true(), false()))]",
    "main [print(or(0, 1))",
    "main [print(or(false(), 0))]",
    "main [print(not(1))]",
    "main [print(not(false()))]",
    "main [let(name, 'Daniel'), let('age', 19), print('Hello, my name is ${name} and I am ${age} years old!')]",
    "main [print(merge('Hello', ' ', 'World', '!'))]",
    "main [print(reverse('keyword'))]",
    "main [print(contains('word', 'ord'))]",
    "main [print(remove('word', 'w'))]",
    "main [print(any(true()))]",
    "main [print(startsWith('Daniel', 'Dan'))]",
    "main [print(endsWith('Daniel', 'niel'))]",
    "main [print(isStr('word'))]",
    "main [print(isStr(100))]",
    "main [print(isNum(0))]",
    "main [print(isNum('keyword'))]",
    "main [print(parseStr('100'))]",
    "main [print(parseNum(100))]",
    "main [let(x, 10), print(x), let(x, 20), print(x)]",
    "main [let(x, 10), print(x), exit('Exiting'), print(x)]",
    "main [let(index, 10), exec('loop')] loop [print(index), let(index, dec(index)), if(exec('loop'), none(), gt(index, 0))]",
    "main [print(upper('wOrD'))]",
    "main [print(lower('wOrD'))]",
    "main [print(capital('word'))]",
    "main [print(unCapital('WorD'))]",
    "main [print(capital(unCapital('Word')))]",
    "main [print(sin(1))]",
    "main [print(cos(1))]",
    "main [print(tan(1))]"
]

// Expected output buffers of the individual tests
// These are the core of the utlity since unexpected behaviour doesn't have to crash Fractal
const expectedOutputBuffers = [
    ['Hello World!'],
    ["1", "2", "3"],
    [],
    ["30"],
    ["5"],
    ["2 5"],
    ["11 6"],
    ["-1 5"],
    ["4 27"],
    ["2 3"],
    ["10 5"],
    ["100"],
    ["-50"],
    ["-20"],
    ["15"],
    ["33"],
    ["75"],
    ["1"],
    ["0"],
    [""],
    ["1"],
    ["1"],
    ["1"],
    ["1"],
    ["0"],
    ["1"],
    ["0"],
    ["1"],
    ["0"],
    ["1"],
    ["0"],
    ["0"],
    ["1"],
    ["Hello, my name is Daniel and I am 19 years old!"],
    ["Hello World!"],
    ["drowyek"],
    ["1"],
    ["ord"],
    ["1"],
    ["1"],
    ["1"],
    ["1"],
    ["0"],
    ["1"],
    ["0"],
    ["100"],
    ["100"],
    ["10", "20"],
    ["10", "Exiting"],
    ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"],
    ["WORD"],
    ["word"],
    ["Word"],
    ["worD"],
    ["Word"],
    ["0.8414709848078965"],
    ["0.5403023058681398"],
    ["1.5574077246549023"]
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

    if ((Number(testIndex) + 1) == totalTests) console.info(`[Fractal] All tests have passed successfully`)
}