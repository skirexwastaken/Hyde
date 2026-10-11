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

import {FUNCTIONS} from "../../constants/functions.js"

// Function that makes sure that input arguments are in a form of an object variableName : variableValue
// Additionaly there's a standard variable check that makes sure function names are not part of a variable name
export const checkInputArguments = {
    checkInputArguments(inputArguments){
        if (!(inputArguments instanceof Object)) {
            throw new Error("Argument Error: Input arguments are not an Object")

        }

        for (const inputArgument in inputArguments){
            if (!(["string", "number"].includes(typeof inputArguments[inputArgument]))) {
                throw new Error("Argument Error: One of the arguments is of an invalid data type")

            }

            for (const func in FUNCTIONS){
                if (inputArgument.includes(func)) {
                    throw new Error(`Syntax Error: Variable [${inputArgument}] contains a function name`)

                }
            } 
        }

        this.inputArguments = inputArguments
    }
}