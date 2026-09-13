import {Marker} from "../marker/marker.js"

import {cacheCss} from "./methods/cache/cacheCss.js"
import {cacheHtml} from "./methods/cache/cacheHtml.js"
import {cacheIcon} from "./methods/cache/cacheIcon.js"
import {cacheImage} from "./methods/cache/cacheImage.js"

import {getFile} from "./methods/get/getFile.js"

export class loCache {
    constructor() {
        this.Marker = new Marker()

        this.htmlCacheCounter = 0
        this.htmlRouteMap = {}
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

    cacheCss,
    cacheHtml,
    cacheIcon,
    cacheImage,
    
    getFile
    
)
