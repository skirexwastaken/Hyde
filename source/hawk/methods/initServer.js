import http from "http"

import fs from "node:fs"
import path from "node:path"

import {markdownDirectory} from "../constants/paths.js";

export const initServer = {
    initServer() {
        this.server = http.createServer((request, result) => {
            let route = request.url.slice(1)

            console.log(`[Hawk] Processing request at route /${route}`)

            if (route == "") route = "index"

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