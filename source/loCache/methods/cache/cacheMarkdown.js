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

import fs from "node:fs";
import path from "node:path";

import {markdownDirectory, htmlDirectory, scriptDirectory} from "../../../constants/paths.js";

// This function caches HTML and Fractal bytecode from processed Markdown files
// It has multiple paths of execution
    // Markdown is not yet cached
        // Markdown content will be cached from existing html and fcs files
        // Markdown content will be cached by extracting html and fcs content from it using Marker

    // Markdown is already cached
        // If there is newer version of this file it will be recached using Marker

export const cacheMarkdown = {
    cacheMarkdown(route, stats) {
        const fullPathHtml = path.resolve(htmlDirectory, `${route}.html`)
        const fullPathFractal = path.resolve(scriptDirectory, `${route}.fsc`)

        let filesAreFresh = false
        if (fs.existsSync(fullPathHtml) && fs.existsSync(fullPathFractal)){
            const statsHtml = fs.statSync(fullPathHtml)
            const statsFractal = fs.statSync(fullPathFractal)

            filesAreFresh = (statsHtml.mtime.getTime() > stats.mtime.getTime() && statsFractal.mtime.getTime() > stats.mtime.getTime())

        }

        let htmlFile, fractalBytecode

        if (filesAreFresh == true) {
            htmlFile = fs.readFileSync(fullPathHtml, "utf8")
            const rawfractalBytecode = fs.readFileSync(fullPathFractal, "utf8")

            try {
                fractalBytecode = JSON.parse(rawfractalBytecode)

                console.log(`[loCache] ${route}.md has been cached from ${route}.html and ${route}.fsc`)

            } catch (error) {
                fractalBytecode = []

                console.log(`[loCache] There has been an error when parsing ${route}.fcs to JSON`)

            }

        } else {
            [htmlFile, fractalBytecode] = this.Marker.convert(`${route}.md`)

            console.log(`[loCache] ${route}.md has been cached`)

        }

        this.markdownRouteMap[route] = this.markdownCacheCounter++
        this.markdownFiles.push([htmlFile, fractalBytecode])
        this.markdownFilesModified.push(stats.mtime)

        console.log(`[loCache] ${route}.md has been cached`)

    }
}