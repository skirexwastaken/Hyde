import {convert} from "./methods/convert.js"
import {generateHTML} from "./methods/generateHTML.js"
import {getMarkdown} from "./methods/getMarkdown.js"
import {processMarkdown} from "./methods/processMarkdown.js"
import {processWrapper} from "./methods/processWrapper.js"
import {saveHTML} from "./methods/saveHTML.js"

export class Marker {

}

Object.assign(
    Marker.prototype,
    convert,
    generateHTML,
    getMarkdown,
    processMarkdown,
    processWrapper,
    saveHTML

)