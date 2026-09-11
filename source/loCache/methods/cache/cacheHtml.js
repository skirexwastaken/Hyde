
import fs from "node:fs";
import path from "node:path";

import {markdownDirectory} from "../../../constants/paths.js";

// This function caches HTML and Fractal bytecode from processed Markdown files
export const cacheHtml = {
    cacheHtml(route) {
        const fullPathMarkdown = path.resolve(markdownDirectory, `${route}.md`)
        const statsMarkdown = fs.statSync(fullPathMarkdown)

        if (!(route in this.routeMap)) {  
            const [htmlFile, fractalCode] = this.Marker.convert(`${route}.md`)

            this.routeMap[route] = this.htmlCacheCounter++
            this.htmlFiles.push(htmlFile)
            this.htmlFilesModified.push(statsMarkdown.mtime)

            const compiledBytecode = this.compileFractalCode(fractalCode)

            this.fractalBytecodes.push(compiledBytecode)
        
            console.log(`[loCache] ${route}.md has been cached`)

        } else {
                if (this.htmlFilesModified[this.routeMap[route]].getTime() != statsMarkdown.mtime.getTime()) {
                    const [htmlFile, fractalCode] = this.Marker.convert(`${route}.md`)

                    const compiledBytecode = this.compileFractalCode(fractalCode)

                    this.htmlFiles[this.routeMap[route]] = htmlFile
                    this.fractalBytecodes[this.routeMap[route]] = compiledBytecode
                    
                    console.log(`[loCache] ${route}.md has been recached`)
            }
        }
    }
}