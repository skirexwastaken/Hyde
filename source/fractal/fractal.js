// Importing needed modules
import {coreTools} from "./coreTools/coreTools.js"
import { MemoryManager } from "./memoryManager/memoryManager.js"
import { FUNCTIONS, NFUNCTIONS, CFUNCTIONS, DEBUG } from "./constants/constants.js"

// Importing Fractal modules
import {argumentCounter} from "./methods/argumentCounter.js"
import {argumentCountVerifier} from "./methods/argumentCountVerifier.js"
import {execute} from "./methods/execute.js"
import {interpreter} from "./methods/interpreter.js"
import {lexer} from "./methods/lexer.js"
import {parser} from "./methods/parser.js"
import {scanner} from "./methods/scanner.js"

// Compiler + Interpreter of Fractal
export class Fractal {
    constructor(code){
        this.instructionSets = {}
        this.metaData = {}

        this.codeBlocksIf = 0 // Counter of how many if code blocks were created inside lexer function
        this.codeBlocksElse = 0
        this.codeBlocksLambda = 0

        this.currentLineIndex
        this.codeBlockName

        this.coreTools = new coreTools()

        this.MemoryManager = new MemoryManager()

        this.coreTools.shellOutput("Fractal Alpha [18.8.2026]")

        // Main loop that calls individual Fractal steps

        // 1. Loading raw string
        const rawCode = this.coreTools.codeInput(code)
        if (DEBUG) console.log(rawCode)

        // 2. Converting code into tokenized code and checking for syntax rules
        const tokenizedCode = this.lexer(rawCode)
        if (DEBUG) console.log(JSON.stringify(tokenizedCode, null))

        // 3. Turning the tokenized code into single dictionary and replacing keywords with direct function calls
        this.parser(tokenizedCode)
        if (DEBUG) console.log(JSON.stringify(this.instructionSets, null))

        // 4. Loading the code from the dictionary and executing instructions
        this.interpreter()

    }
}

Object.assign(
    Fractal.prototype,
    argumentCounter,
    argumentCountVerifier,
    execute,
    interpreter,
    lexer,
    parser,
    scanner
)   