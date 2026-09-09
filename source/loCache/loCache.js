import {Marker} from "../marker/marker.js"

import {cacheFiles} from "./methods/cacheFiles.js"
import {getHtml} from "./methods/getHtml.js"
import {getBytecode} from "./methods/getBytecode.js"

export class loCache {
    constructor() {
        this.Marker = new Marker()

        this.routeMap = {}

        this.cacheCounter = 0
        this.filesModified = []
        this.htmlFiles = []
        this.fractalBytecodes = []

    }
}

Object.assign(
    loCache.prototype,
    cacheFiles,
    getHtml,
    getBytecode,
)
