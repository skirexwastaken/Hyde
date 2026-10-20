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

import path from "node:path"

import {markdownDirectory, stylesDirectory, iconDirectory, imageDirectory} from "../../constants/paths.js"
import {markdownInit, stylesInit, iconInit, imageInit} from "../constants/initCacheContent.js"
import {getStats} from "../../constants/macros.js"

// This function allows to cache specific files at startup allowing users to access them straight away without the caching delay
export const initCache = {
    initCache() {
        for (const markdownFile of markdownInit) {
            const fullPath = path.resolve(markdownDirectory, `${markdownFile}.md`)
            const stats = getStats(fullPath)

            if (stats) {
                this.cacheMarkdown(markdownFile, stats)

            }
        }

        for (const cssFile of stylesInit) {
            const fullPath = path.resolve(stylesDirectory, `${cssFile}.css`)
            const stats = getStats(fullPath)

            if (stats) {
                this.cacheCss(cssFile, stats)

            }
        }

        for (const iconFile of iconInit) {
            const fullPath = path.resolve(iconDirectory, `${iconFile}.ico`)
            const stats = getStats(fullPath)

            if (stats) {
                this.cacheIcon(iconFile, stats)

            }
        }

        for (const imageFile of imageInit) {
            const fullPath = path.resolve(imageDirectory, `${imageFile}.png`)
            const stats = getStats(fullPath)

            if (stats) {
                this.cacheImage(imageFile, stats)

            }
        }

        
        console.log(`[loCache] Cache has been initialized`)

    }
}