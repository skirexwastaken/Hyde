import {Marker} from "../marker/marker.js"

import {cacheCss} from "./methods/cache/cacheCss.js"
import {cacheHtml} from "./methods/cache/cacheHtml.js"
import {cacheIcon} from "./methods/cache/cacheIcon.js"
import {cacheImage} from "./methods/cache/cacheImage.js"

import {getHtml} from "./methods/get/getHtml.js"
import {getCss} from "./methods/get/getCss.js"
import {getBytecode} from "./methods/get/getBytecode.js"
import {getIcon} from "./methods/get/getIcon.js"
import {getImage} from "./methods/get/getImage.js"

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
        

        this.iconCacheCounter = 0
        this.iconRouteMap = {}
        this.iconFiles = []
        this.iconFilesModified = []

        this.imageCacheCounter = 0
        this.imageRouteMap = {}
        this.imageFiles = []
        this.imageFilesModified = []

    }
}

Object.assign(
    loCache.prototype,

    cacheHtml,
    getHtml,
    cacheIcon,
    cacheImage,
    
    getBytecode,
    cacheCss,
    getCss,
    getIcon,
    getImage
)
