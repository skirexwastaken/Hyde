import {loadMarkdown} from "./methods/inputOutput/loadMarkdown.js"
import {saveHtml} from "./methods/inputOutput/saveHtml.js"

import {compileFractalCode} from "./methods/segmentSpecific/fractal/compileFractalCode.js"
import {extractFractal} from "./methods/segmentSpecific/fractal/extractFractal.js"

import {processJsonWeb} from "./methods/segmentSpecific/processJsonWeb.js"
import {processWrapper} from "./methods/segmentSpecific/processWrapper.js"

import {convert} from "./methods/convert.js"
import {generateHtml} from "./methods/generateHtml.js"
import {processMarkdown} from "./methods/processMarkdown.js"

export class Marker {

}

Object.assign(
    Marker.prototype,
    
    loadMarkdown,
    saveHtml,

    compileFractalCode,
    extractFractal,

    processJsonWeb,
    processWrapper,

    convert,
    generateHtml,
    processMarkdown,

)