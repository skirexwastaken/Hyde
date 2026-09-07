import {generateHTML} from "./methods/generateHTML.js"
import {getMarkdown} from "./methods/getMarkdown.js"
import {processMarkdown} from "./methods/processMarkdown.js"
import {processWrapper} from "./methods/processWrapper.js"
import {saveHTML} from "./methods/saveHTML.js"
export class Marker{
    convert(filename) {
        const rawMarkdown = this.getMarkdown(filename)

        const processedMarkdown = this.processMarkdown(rawMarkdown)

        const generatedHTML = this.generateHTML(processedMarkdown)

        this.saveHTML(filename, generatedHTML)

        return generatedHTML

    }
}

Object.assign(
    Marker.prototype,
    generateHTML,
    getMarkdown,
    processMarkdown,
    processWrapper,
    saveHTML

)