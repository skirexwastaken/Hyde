import {Fractal} from "../../source/fractal/fractal.js"

// Silencing the debug prints from Fractal as they are not needed here
/*console.log = function() {

}*/

// Individual tests that will be run and their expected console outputs
const testCases = [
    /* 001 */ [
        "main [print('Hello World!')]", 
        ['Hello World!']

    ], 

    /* 002 */ [
        "main [print(1), print(2), print(3)]",
        ["1", "2", "3"]

    ],

    /* 003 */ [
        "main [print('This message will be cleared'), clear()]", 
        []

    ],

    /* 004 */ [
        "main [print(add(add(5, 5),add(10, 10)))]", 
        ["30"]

    ],
    
    /* 005 */ [
        "main [print(add(sub(10, 10), 5))]", 
        ["5"]

    ],

    /* 006 */ [
        "main [print(div(10,5), div(15, 3))]", 
        ["2 5"]

    ],

    /* 007 */ [
        "main [print(inc(10), inc(5))]", 
        ["11 6"]

    ],

    /* 008 */ [
        "main [print(dec(0), dec(6))]",
        ["-1 5"]

    ],

    /* 009 */ [
        "main [print(pow(2, 2), pow(3, 3))]", 
        ["4 27"]

    ],

    /* 010 */ [
        "main [print(sqrt(4), sqrt(9))]",
        ["2 3"]

    ],

    /* 011 */ [
        "main [print(abs(-10), abs(5))]", 
        ["10 5"]

    ],

    /* 012 */ [
        "main [print(eval('100 + 100 - 50 * 2'))]", 
        ["100"]

    ],

    /* 013 */ [
        "main [print(eval('100 / 2 - 50 * 2'))]",
        ["-50"]

    ],

    /* 014 */ [
        "main [print(min(-10, -5, 15, -20, 3, 5))]",
        ["-20"]

    ],

    /* 015 */ [
        "main [print(max(-10, -5, 15, -20, 3, 5))]",
        ["15"]

    ],

    /* 016 */ [
        "main [print(sum(10, 5, 10, 3, 5))]",
        ["33"]

    ],

    /* 017 */ [
        "main [print(average(100, 50, 100, 50))]",
        ["75"]

    ],

    /* 018 */ [
        "main [print(true())]", 
        ["1"]

    ],

    /* 019 */ [
        "main [print(false())]",
        ["0"]

    ],

    /* 020 */ [
        "main [print(none())]",
        [""]

    ],

    /* 021 */ [
        "main [print(eq(1, true()))]",
        ["1"]

    ],

    /* 022 */ [
        "main [print(eq(0, false()))]",
        ["1"]

    ],

    /* 023 */ [
        "main [print(gt(10, 5))]",
        ["1"]

    ],

    /* 024 */ [
        "main [print(gt(50, 20))]",
        ["1"]

    ],

    /* 025 */ [
        "main [print(gt(5, 16))]",
        ["0"]

    ],

    /* 026 */ [
        "main [print(lt(10, 20))]",
        ["1"]

    ],

    /* 027 */ [
        "main [print(lt(20, 5))]",
        ["0"]

    ],

    /* 028 */ [
        "main [print(and(true(), 10))]",
        ["1"]

    ],

    /* 029 */ [
        "main [print(and(true(), false()))]",
        ["0"]

    ],

    /* 030 */ [
        "main [print(or(0, 1))",
        ["1"]

    ],

    /* 031 */ [
        "main [print(or(false(), 0))]",
        ["0"]

    ],

    /* 032 */ [
        "main [print(not(1))]",
        ["0"]

    ],

    /* 033 */ [
        "main [print(not(false()))]",
        ["1"]

    ],
     
    /* 034 */ [
        "main [let(name, 'Daniel'), let('age', 19), print('Hello, my name is ${name} and I am ${age} years old!')]", 
        ["Hello, my name is Daniel and I am 19 years old!"]

    ],

    /* 035 */ [
        "main [print(merge('Hello', ' ', 'World', '!'))]",
        ["Hello World!"]

    ],

    /* 036 */ [
        "main [print(reverse('keyword'))]",
        ["drowyek"]

    ],

    /* 037 */ [
        "main [print(contains('word', 'ord'))]",
        ["1"]

    ],

    /* 038 */ [
        "main [print(remove('word', 'w'))]", 
        ["ord"]
    
    ],

    /* 039 */ [
        "main [print(any(true()))]",
        ["1"]

    ],

    /* 040 */ [
        "main [print(startsWith('Daniel', 'Dan'))]",
        ["1"]

    ],

    /* 041 */ [
        "main [print(endsWith('Daniel', 'niel'))]",
        ["1"]

    ],

    /* 042 */ [
        "main [print(isStr('word'))]",
        ["1"]

    ],

    /* 043 */ [
        "main [print(isStr(100))]",
        ["0"]

    ],

    /* 044 */ [
        "main [print(isNum(0))]",
        ["1"]

    ],

    /* 045 */ [
        "main [print(isNum('keyword'))]",
        ["0"]

    ],

    /* 046 */ [
        "main [print(parseStr('100'))]",
        ["100"]

    ],

    /* 047 */ [
        "main [print(parseNum(100))]",
        ["100"]

    ],

    /* 048 */ [
        "main [let(x, 10), print(x), let(x, 20), print(x)]", 
        ["10", "20"]

    ],

    /* 049 */ [
        "main [let(x, 10), print(x), exit('Exiting'), print(x)]",
        ["10", "Exiting"]
    
    ],

    /* 050 */ [
        "main [let(index, 10), exec('loop')] loop [print(index), let(index, dec(index)), if(exec('loop'), none(), gt(index, 0))]", 
        ["10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]

    ],

    /* 051 */ [
        "main [print(upper('wOrD'))]",
        ["WORD"]

    ],

    /* 052 */ [
        "main [print(lower('wOrD'))]",
        ["word"]

    ],

    /* 053 */ [
        "main [print(capital('word'))]",
        ["Word"]

    ],

    /* 054 */ [
        "main [print(unCapital('WorD'))]", 
        ["worD"]

    ],

    /* 055 */ [
        "main [print(capital(unCapital('Word')))]", 
        ["Word"]

    ],

    /* 056 */ [
        "main [print(sin(1))]",
        ["0.8414709848078965"]
    
    ],

    /* 057 */ [
        "main [print(cos(1))]", 
        ["0.5403023058681398"]

    ],

    /* 058 */ [
        "main [print(tan(1))]", 
        ["1.5574077246549023"]

    ],

    /* 059 */ [
        "main [print('test', 'test', 'test')]", 
        ["test test test"]

    ],

    /* 060 */ [
        "main [print(charAt('word', 0), charAt('word', -1), charAt('word', 5), charAt('word', -5))]", 
        ["w d"]

    ],

    /* 061 */ [
        "main [print(dropEnd('example'))]", 
        ["exampl"]

    ],

    /* 062 */ [
        "main [print(dropStart('example'))]",
        ["xample"]
    ],

    /* 063 */ [
        "main [print(extendEnd('word', '1'))]",
        ["word1"]
    ],

    /* 064 */ [
        "main [print(extendStart('word', '2'))]",
        ["2word"]
    ],

    /* 065 */ [
        "main [print(sqrt(-16))]", 
        ["0"]
    ],

    /* 066 */ [
        "main [print('')]",
        [""]
    ]
]

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