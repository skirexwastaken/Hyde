import {asyncSleep} from "./methods/asyncSleep.js"
import {clearShell} from "./methods/clearShell.js"
import {codeInput} from "./methods/codeInput.js"
import {convertToNumberUsingAscii} from "./methods/convertToNumberUsingAscii.js"
import {isNumber} from "./methods/isNumber.js"
import {shellOutput} from "./methods/shellOutput.js"
import {sleep} from "./methods/sleep.js"
import {fractalEval} from "./methods/fractalEval.js"

// Additional tools used in Fractal
export class coreTools {
 
}

Object.assign(
    coreTools.prototype,
    asyncSleep,
    clearShell,
    codeInput,
    convertToNumberUsingAscii,
    isNumber,
    shellOutput,
    sleep,
    fractalEval
)