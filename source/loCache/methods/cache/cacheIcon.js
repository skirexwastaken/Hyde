import fs from "node:fs";
import path from "node:path";

import {iconDirectory} from "../../../constants/paths.js"

export const cacheIcon = {
    cacheIcon(route) {
        const fullPath = path.resolve(iconDirectory, route)
        const iconStats = fs.statSync(fullPath)

        if (!(route in this.iconRouteMap)) {
            const iconFile = fs.readFileSync(fullPath)

            this.iconRouteMap[route] = this.iconCacheCounter++
            this.iconFiles.push(iconFile)
            this.iconFilesModified.push(iconStats.mtime)

        } else {
            if (iconStats.mtime.getTime() != this.iconFilesModified[this.iconRouteMap[route]].getTime()) {
                const iconFile = fs.readFileSync(fullPath)

                this.iconFiles[this.iconRouteMap[route]] = iconFile
            }

        }
    }
}