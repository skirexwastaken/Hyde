/*
GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2026 Daniel Hora

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

import {Marker} from "../marker/marker.js"

import {cacheFile} from "./methods/cacheFile.js"
import {getFile} from "./methods/getFile.js"
import {initCache} from "./methods/initCache.js"

export class loCache {
    constructor() {
        this.Marker = new Marker()

        this.markdownCacheCounter = 0
        this.markdownRouteMap = {}
        this.markdownFilesModified = []
        this.markdownFiles = []

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

        this.initCache()

    }
}

Object.assign(
    loCache.prototype,

    cacheFile,
    getFile,
    initCache
    
)
