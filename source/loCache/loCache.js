import {Marker} from "../marker/marker.js"

import {cacheFiles} from "./methods/cacheFiles.js"
import {getHtml} from "./methods/getHtml.js"

export class loCache {
    constructor() {
        this.Marker = new Marker()

        this.routeMap = {}

        this.cacheCounter = 0
        this.filesModified = []
        this.htmlFiles = []

    }

}

Object.assign(
    loCache.prototype,
    cacheFiles,
    getHtml
)
