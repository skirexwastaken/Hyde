import fs from "node:fs";
import path from "node:path";

import {iconDirectory} from "../../../constants/paths.js"

export const cacheIcon = {
    cacheIcon(route, stats) {
        const fullPath = path.resolve(iconDirectory, route)
        const iconFile = fs.readFileSync(fullPath)

        this.iconRouteMap[route] = this.iconCacheCounter++
        this.iconFiles.push(iconFile)
        this.iconFilesModified.push(stats.mtime)

        console.log(`[loCache] ${route} has been cached`)
        
    }
}