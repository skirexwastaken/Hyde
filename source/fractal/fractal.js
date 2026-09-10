// Importing needed modules
import {coreTools} from "./coreTools/coreTools.js"
import {MemoryManager} from "./memoryManager/memoryManager.js"
import {FUNCTIONS, NFUNCTIONS, CFUNCTIONS} from "./constants/constants.js"

// Importing Fractal modules
import {argumentCounter} from "./methods/argumentCounter.js"
import {argumentCountVerifier} from "./methods/argumentCountVerifier.js"
import {checkInputArguments} from "./methods/checkInputArguments.js"
import {execute} from "./methods/execute.js"
import {generateOutputArguments} from "./methods/generateOutputArguments.js"
import {interpreter} from "./methods/interpreter.js"
import {lexer} from "./methods/lexer.js"
import {loadInputArguments} from "./methods/loadInputArguments.js"
import {parser} from "./methods/parser.js"
import {scanner} from "./methods/scanner.js"
import { compile } from "./methods/compile.js"

// Fractal is combination of a compiler and a VM for the Fractal programming language
// Fractal code compiles into reusable bytecode that is then interpreted by a virtual machine
// The compiler works on a principle of ahead of time compiling
export class Fractal {
    constructor(inputArguments){
        this.coreTools = new coreTools()

        this.MemoryManager = new MemoryManager()

        // Check if arguments are a valid object
        this.checkInputArguments(inputArguments)
    }
}

Object.assign(
    Fractal.prototype,
    argumentCounter,
    argumentCountVerifier,
    checkInputArguments,
    execute,
    generateOutputArguments,
    interpreter,
    lexer,
    loadInputArguments,
    parser,
    scanner,
    compile
)