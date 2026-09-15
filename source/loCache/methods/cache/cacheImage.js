import fs from "node:fs";
import path from "node:path";

import {imageDirectory} from "../../../constants/paths.js"

export const cacheImage = {
    cacheImage(route) {
        const fullPath = path.resolve(imageDirectory, route)
        const imageStats = fs.statSync(fullPath)

        const imageFile = fs.readFileSync(fullPath)

        this.imageRouteMap[route] = this.imageCacheCounter++
        this.imageFiles.push(imageFile)
        this.imageFilesModified.push(imageStats.mtime)

    }
}