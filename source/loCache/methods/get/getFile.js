import fs from "node:fs"
import path from "node:path"

import {stylesDirectory, iconDirectory, imageDirectory} from "../../../constants/paths.js"

export const getFile =  {
    getFile(route, type, stats) {
        switch (type) {
            case "markdown": {
                if (stats.mtime.getTime() != this.markdownFilesModified[this.markdownRouteMap[route]].getTime()) {
                    const markdownProcessed = this.Marker.convert(`${route}.md`)

                    this.markdownFiles[this.markdownRouteMap[route]] = markdownProcessed
                    
                    console.log(`[loCache] ${route}.md has been recached`)

                    return markdownProcessed
                    
                }

                return this.markdownFiles[this.markdownRouteMap[route]]

            }

            case "css": {
                if (stats.mtime.getTime() != this.cssFilesModified[this.cssRouteMap[route]].getTime()) {
                    const fullPath = path.resolve(stylesDirectory, route)
                    const cssFile = fs.readFileSync(fullPath, "utf-8")

                    this.cssFiles[this.cssRouteMap[route]] = cssFile

                    console.log(`[loCache] ${route} has been recached`)

                    return cssFile

                }

                return this.cssFiles[this.cssRouteMap[route]]

            }

            case "ico": {
                if (stats.mtime.getTime() != this.iconFilesModified[this.iconRouteMap[route]].getTime()) {
                    const fullPath = path.resolve(iconDirectory, route)
                    const iconFile = fs.readFileSync(fullPath)

                    this.iconFiles[this.iconRouteMap[route]] = iconFile

                    console.log(`[loCache] ${route} has been recached`)

                    return iconFile

                }

                return this.iconFiles[this.iconRouteMap[route]]

            }

            case "image": {
                if (stats.mtime.getTime() != this.imageFilesModified[this.imageRouteMap[route]].getTime()) {
                    const fullPath = path.resolve(imageDirectory, route)
                    const imageFile = fs.readFileSync(fullPath)
    
                    this.imageFiles[this.imageRouteMap[route]] = imageFile

                    console.log(`[loCache] ${route} has been recached`)

                    return imageFile

                }

                return this.imageFiles[this.imageRouteMap[route]]

            }
        }
    }
}