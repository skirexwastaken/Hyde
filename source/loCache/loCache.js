import {Marker} from "../marker/marker.js"

import {cacheCss} from "./methods/cacheCss.js"
import {cacheFiles} from "./methods/cacheFiles.js"
import {getHtml} from "./methods/getHtml.js"
import {getCss} from "./methods/getCss.js"
import {getBytecode} from "./methods/getBytecode.js"

export class loCache {
    constructor() {
        this.Marker = new Marker()

        this.routeMap = {}

        this.cacheCounter = 0
        this.filesModified = []
        this.htmlFiles = []
        this.fractalBytecodes = []

        this.cssCacheCounter = 0
        this.cssRouteMap = {}
        this.cssFiles = []
        this.cssFilesModified = []

    }
}

Object.assign(
    loCache.prototype,
    cacheFiles,
    getHtml,
    getBytecode,
    cacheCss,
    getCss
)
