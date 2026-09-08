
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const markdownDirectory = path.resolve(currentDirectory, "../../../templates/markdown")

export const cacheFiles = {
    cacheFiles(route) {
        const fullPathMarkdown = path.resolve(markdownDirectory, `${route}.md`)
        const statsMarkdown = fs.statSync(fullPathMarkdown)

        if (!(route in this.routeMap)) {  
            
            const htmlFile = this.Marker.convert(`${route}.md`)

            this.routeMap[route] = this.cacheCounter++
            this.htmlFiles.push(htmlFile)
            this.filesModified.push(statsMarkdown.mtime)

        } else {
            if (this.filesModified[this.routeMap[route]].getTime() != stats.mtime.getTime()) {
                const htmlFile = this.Marker.convert(`${route}.md`)

                this.htmlFiles[this.routeMap[route]] = htmlFile
            }
        }
    }
}