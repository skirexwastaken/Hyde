import fs from "node:fs";
import path from "node:path";

import {iconDirectory} from "../../../constants/paths.js"

export const cacheIcon = {
    cacheIcon(route) {
        const fullPath = path.resolve(iconDirectory, route)
        const iconStats = fs.statSync(fullPath)

        const iconFile = fs.readFileSync(fullPath)

        this.iconRouteMap[route] = this.iconCacheCounter++
        this.iconFiles.push(iconFile)
        this.iconFilesModified.push(iconStats.mtime)
        
    }
}