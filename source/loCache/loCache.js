import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {Marker} from "../marker/marker.js"

export class loCache {
    constructor() {
        this.routeMap = {}

        this.cacheCounter = 0
        this.filesLastCanged = []
        this.htmlFiles = []

        this.Marker = new Marker()
    }

    cacheFiles(route) {
        const htmlFile = this.Marker.convert(`${route}.md`)

        if (!(route in this.routeMap)) {
            this.routeMap[route] = this.cacheCounter++
            this.htmlFiles.push(htmlFile)

        } else {
            this.htmlFiles[this.routeMap[route]] = htmlFile

        }
    }

    getHtml(route) {
        return this.htmlFiles[this.routeMap[route]]
    }

}