
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

export const cacheHtml = {
    cacheHtml(route) {
        const fullPathMarkdown = path.resolve(markdownDirectory, `${route}.md`)
        const statsMarkdown = fs.statSync(fullPathMarkdown)

        const fullPathHtml = path.resolve(htmlDirectory, `${route}.html`)
        const fullPathFractal = path.resolve(scriptDirectory, `${route}.fsc`)

        if (!(route in this.routeMap)) {  

            let filesAreFresh = false
            if (fs.existsSync(fullPathHtml) && fs.existsSync(fullPathFractal)){
                const statsHtml = fs.statSync(fullPathHtml)
                const statsFractal = fs.statSync(fullPathFractal)

                filesAreFresh = (statsHtml.mtime.getTime() > statsMarkdown.mtime.getTime() && statsFractal.mtime.getTime() > statsMarkdown.mtime.getTime())

            }

            let htmlFile, fractalCode, fractalBytecode

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
                [htmlFile, fractalCode] = this.Marker.convert(`${route}.md`)

                fractalBytecode = this.compileFractalCode(fractalCode)

                console.log(`[loCache] ${route}.md has been cached`)
            }

            this.routeMap[route] = this.htmlCacheCounter++
            this.htmlFiles.push(htmlFile)
            this.htmlFilesModified.push(statsMarkdown.mtime)

            this.fractalBytecodes.push(fractalBytecode)

        } else {
                if (this.htmlFilesModified[this.routeMap[route]].getTime() != statsMarkdown.mtime.getTime()) {
                    const [htmlFile, fractalCode] = this.Marker.convert(`${route}.md`)

                    const fractalBytecode = this.compileFractalCode(fractalCode)

                    this.htmlFiles[this.routeMap[route]] = htmlFile
                    this.fractalBytecodes[this.routeMap[route]] = fractalBytecode
                    
                    console.log(`[loCache] ${route}.md has been recached`)
            }
        }
    }
}