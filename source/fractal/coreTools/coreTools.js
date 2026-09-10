import {clearShell} from "./methods/clearShell.js"
import {codeInput} from "./methods/codeInput.js"
import {convertToNumberUsingAscii} from "./methods/convertToNumberUsingAscii.js"
import {isNumber} from "./methods/isNumber.js"
import {shellOutput} from "./methods/shellOutput.js"
import {fractalEval} from "./methods/fractalEval.js"

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
    convertToNumberUsingAscii,
    isNumber,
    shellOutput,
    fractalEval
)