import fs from "node:fs";
import path from "node:path";

import {imageDirectory} from "../../../constants/paths.js"

export const cacheImage = {
    cacheImage(route) {
        const fullPath = path.resolve(imageDirectory, route)
        const imageStats = fs.statSync(fullPath)

        if (!(route in this.imageRouteMap)) {
            const imageFile = fs.readFileSync(fullPath)

            this.imageRouteMap[route] = this.imageCacheCounter++
            this.imageFiles.push(imageFile)
            this.imageFilesModified.push(imageStats.mtime)

        } else {
            if (imageStats.mtime.getTime() != this.imageFilesModified[this.imageRouteMap[route]].getTime()) {
                const imageFile = fs.readFileSync(fullPath)

                this.imageFiles[this.imageRouteMap[route]] = imageFile
            }

        }
    }
}