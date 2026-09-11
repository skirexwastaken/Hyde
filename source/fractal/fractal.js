// Importing needed modules
import {coreTools} from "./coreTools/coreTools.js"
import {MemoryManager} from "./memoryManager/memoryManager.js"
import {FUNCTIONS, NFUNCTIONS, CFUNCTIONS} from "./constants/functions.js"

// Importing Fractal modules
import {checkInputArguments} from "./methods/argumentsSupport/checkInputArguments.js"
import {generateOutputArguments} from "./methods/argumentsSupport/generateOutputArguments.js"
import {loadInputArguments} from "./methods/argumentsSupport/loadInputArguments.js"


import {argumentCounter} from "./methods/compiler/argumentCounter.js"
import {argumentCountVerifier} from "./methods/compiler/argumentCountVerifier.js"
import {compile} from "./methods/compiler/compile.js"
import {lexer} from "./methods/compiler/lexer.js"
import {parser} from "./methods/compiler/parser.js"
import {scanner} from "./methods/compiler/scanner.js"

import {execute} from "./methods/interpreter/execute.js"
import {interpreter} from "./methods/interpreter/interpreter.js"

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

    checkInputArguments,
    generateOutputArguments,
    loadInputArguments,

    argumentCounter,
    argumentCountVerifier,
    compile,
    lexer,
    parser,
    scanner,
    
    execute,
    interpreter
)