import {Marker} from "../marker/marker.js"

import {cacheCss} from "./methods/cache/cacheCss.js"
import {cacheHtml} from "./methods/cache/cacheHtml.js"

import {getHtml} from "./methods/get/getHtml.js"
import {getCss} from "./methods/get/getCss.js"
import {getBytecode} from "./methods/get/getBytecode.js"

export class loCache {
    constructor() {
        this.Marker = new Marker()

        this.routeMap = {}

        this.htmlCacheCounter = 0
        this.htmlFilesModified = []
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

    cacheHtml,
    getHtml,
    
    getBytecode,
    cacheCss,
    getCss,
)
