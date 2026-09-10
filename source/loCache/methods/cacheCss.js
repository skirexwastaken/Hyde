
import fs from "node:fs";
import path from "node:path";

import { stylesDirectory } from "../constants/paths.js"

export const cacheCss = {
    cacheCss(route) {
        const fullPath = path.resolve(stylesDirectory, route)

        const cssStats = fs.statSync(fullPath)

        if (!(route in this.cssRouteMap)) {
            const cssFile = fs.readFileSync(fullPath, "utf-8")

            this.cssRouteMap[route] = this.cssCacheCounter++
            this.cssFiles.push(cssFile)
            this.cssFilesModified.push(cssStats.mtime)

        } else {
            if (cssStats.mtime.getTime() != this.cssFilesModified[this.cssRouteMap[route]].getTime()) {
                const cssFile = fs.readFileSync(fullPath, "utf-8")

                this.cssFiles[this.cssRouteMap[route]] = cssFile
            }

        }
    }
}