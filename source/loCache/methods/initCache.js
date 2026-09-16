import fs from "node:fs"
import path from "node:path"

import {markdownDirectory, stylesDirectory, iconDirectory, imageDirectory} from "../../constants/paths.js"
import {markdownInit, stylesInit, iconInit, imageInit} from "../constants/initCache.js"

const getStats = (file) => fs.statSync(file, { throwIfNoEntry: false }) || false

// This function allows to cache specific files at startup allowing users to access them straight away without the caching delay
export const initCache = {
    initCache() {
        for (const markdownFile of markdownInit) {
            const fullPath = path.resolve(markdownDirectory, markdownFile)
            const stats = getStats(fullPath)

            if (stats) {
                this.cacheMarkdown(markdownFile, stats)

            }
        }

        for (const cssFile of stylesInit) {
            const fullPath = path.resolve(stylesDirectory, cssFile)
            const stats = getStats(fullPath)

            if (stats) {
                this.cacheCss(cssFile, stats)

            }

        }

        for (const iconFile of iconInit) {
            const fullPath = path.resolve(iconDirectory, iconFile)
            const stats = getStats(fullPath)

            if (stats) {
                this.cacheIcon(iconFile, stats)

            }
        }

        for (const imageFile of imageInit) {
            const fullPath = path.resolve(imageDirectory, imageFile)
            const stats = getStats(fullPath)

            if (stats) {
                this.cacheImage(imageFile, stats)

            }
        }

        
        console.log(`[loCache] Cache has been initialized`)

    }
}