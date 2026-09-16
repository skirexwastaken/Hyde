import fs from "node:fs"
import path from "node:path"

import {stylesDirectory} from "../../../constants/paths.js"

export const cacheCss = {
    cacheCss(route, stats) {
        const fullPath = path.resolve(stylesDirectory, route)
        const cssFile = fs.readFileSync(fullPath, "utf-8")

        this.cssRouteMap[route] = this.cssCacheCounter++
        this.cssFiles.push(cssFile)
        this.cssFilesModified.push(stats.mtime)

        console.log(`[loCache] ${route} has been cached`)

    }
}