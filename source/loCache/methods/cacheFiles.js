
import fs from "node:fs";
import path from "node:path";

import {markdownDirectory} from "../constants/paths.js";

export const cacheFiles = {
    cacheFiles(route) {
        const fullPathMarkdown = path.resolve(markdownDirectory, `${route}.md`)
        const statsMarkdown = fs.statSync(fullPathMarkdown)

        if (!(route in this.routeMap)) {  
            
            const htmlFile = this.Marker.convert(`${route}.md`)

            this.routeMap[route] = this.cacheCounter++
            this.htmlFiles.push(htmlFile)
            this.filesModified.push(statsMarkdown.mtime)

            console.log(`[loCache] ${route}.md has been cached`)

        } else {
            if (this.filesModified[this.routeMap[route]].getTime() != statsMarkdown.mtime.getTime()) {
                const htmlFile = this.Marker.convert(`${route}.md`)

                this.htmlFiles[this.routeMap[route]] = htmlFile

                console.log(`[loCache] ${route}.md has been recached`)
            }
        }
    }
}