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

import {clearShell} from "./methods/inputOutput/clearShell.js"
import {codeInput} from "./methods/inputOutput/codeInput.js"
import {shellOutput} from "./methods/inputOutput/shellOutput.js"

import {convertToNumberUsingAscii} from "./methods/math/convertToNumberUsingAscii.js"
import {fractalEval} from "./methods/math/fractalEval.js"
import {isNumber} from "./methods/math/isNumber.js"

// Additional tools used in Fractal
// These tools are not necesarilly part of the execution loop of Fractal so I decided to split them into a separate class
export class coreTools {
    constructor() {
        this.shellOutputBuffer = []
    }
 
}

Object.assign(
    coreTools.prototype,

    clearShell,
    codeInput,
    shellOutput,

    convertToNumberUsingAscii,
    fractalEval,
    isNumber

)