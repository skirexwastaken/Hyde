import fs from "node:fs";
import path from "node:path";

import {imageDirectory} from "../../../constants/paths.js"

export const cacheImage = {
    cacheImage(route, stats) {
        const fullPath = path.resolve(imageDirectory, route)
        const imageFile = fs.readFileSync(fullPath)

        this.imageRouteMap[route] = this.imageCacheCounter++
        this.imageFiles.push(imageFile)
        this.imageFilesModified.push(stats.mtime)

        console.log(`[loCache] ${route} has been cached`)

    }
}