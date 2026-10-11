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
    constructor(options, inputArguments){
        this.coreTools = new coreTools()

        this.MemoryManager = new MemoryManager()

        // Importing functions needed in both Compiler and Interpreter mode
        Object.assign(
            Fractal.prototype,

            checkInputArguments,
            generateOutputArguments,
            loadInputArguments

        )

        // Importing functions needed in compiler mode
        if (options["compiler"] == true) {
            Object.assign(
                Fractal.prototype,

                argumentCounter,
                argumentCountVerifier,
                compile,
                lexer,
                parser,
                scanner

            )

        }

        // Importing options needed in interpreter mode
        if (options["interpreter"] == true) {
            Object.assign(
                Fractal.prototype,

                execute,
                interpreter

            )

        }

        // Check if arguments are a valid object
        this.checkInputArguments(inputArguments)

    }
}