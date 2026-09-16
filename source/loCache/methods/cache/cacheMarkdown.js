
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

        this.htmlRouteMap[route] = this.htmlCacheCounter++
        this.htmlFiles.push(htmlFile)
        this.htmlFilesModified.push(stats.mtime)

        this.fractalBytecodes.push(fractalBytecode)

        console.log(`[loCache] ${route}.md has been cached`)

    }
}