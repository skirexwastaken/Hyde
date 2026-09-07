import http from "http";

import fs from "node:fs"
import path from "node:path";
import { fileURLToPath } from "node:url";


const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const markdownDirectory = path.resolve(currentDirectory, "../../../templates/markdown")

export const initServer = {
    initServer() {
        this.server = http.createServer((request, result) => {
            const route = request.url.slice(1)

            const fullPath = path.resolve(markdownDirectory, `${route}.md`)

            let htmlFile

            if (fs.existsSync(fullPath)) {
                // Caching all files
                this.loCache.cacheFiles(route)

                // Getting the HTML file from cache
                htmlFile = this.loCache.getHtml(route)

            } else {
                // Caching all files
                this.loCache.cacheFiles("error")

                // Getting the HTML file from cache
                htmlFile = this.loCache.getHtml("error")
            }
            

            result.statusCode = 200
            result.setHeader('Content-Type', 'text/html')
            result.end(htmlFile.join(""))

        })
    }
}