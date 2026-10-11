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

import {Fractal} from "../source/fractal/fractal.js"

// This is an example of how Fractal works

// The whole execution loop is in try and catch where the errors are all custom written errors
try {

    // First you need to create an instance of fractal with Input Arguments, which can be an empty object
    const fractalInstance = new Fractal({"compiler": true, "interpreter": true}, {"name": "Daniel"})

    // Before executing the code you need to compile it into Fractal bytecode, you will also get meta data object
    const [instructionSets, metaData] = fractalInstance.compile("main [print('Hey, ${name}!')]")

    // Compiled code can be executed using the interpreter functions, it returns
        // Output Arguments, which are values of input arguments at the end of code execution
        // Shell Output Buffer which contains all of the strings returned by the print function
    const [outputArguments, shellOutputBuffer] =  fractalInstance.interpreter(instructionSets, metaData)

    console.log(JSON.stringify(outputArguments), shellOutputBuffer)

// The erros are all custom written Fractal errors that should be more or less descriptive of what the issue is
} catch (error) {
        console.log(error.message)

}