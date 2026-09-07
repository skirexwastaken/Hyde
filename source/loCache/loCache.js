import {Marker} from "../marker/marker.js"

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const markdownDirectory = path.resolve(currentDirectory, "../../templates/markdown")
export class loCache {
    constructor() {
        this.routeMap = {}

        this.cacheCounter = 0
        this.filesModified = []
        this.htmlFiles = []

        this.Marker = new Marker()
    }

    cacheFiles(route) {
        const fullPath = path.resolve(markdownDirectory, `${route}.md`)
        const stats = fs.statSync(fullPath)

        if (!(route in this.routeMap)) {
            const htmlFile = this.Marker.convert(`${route}.md`)

            this.routeMap[route] = this.cacheCounter++
            this.htmlFiles.push(htmlFile)
            this.filesModified.push(stats.mtime)

        } else {
            if (this.filesModified[this.routeMap[route]].getTime() != stats.mtime.getTime()) {
                const htmlFile = this.Marker.convert(`${route}.md`)

                this.htmlFiles[this.routeMap[route]] = htmlFile
            }

        }
    }

    getHtml(route) {
        return this.htmlFiles[this.routeMap[route]]
    }

}