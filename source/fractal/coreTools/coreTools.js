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