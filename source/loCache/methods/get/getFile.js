import fs from "node:fs"
import path from "node:path"

import {stylesDirectoryrectory, iconDirectory, imageDirectory} from "../../../constants/paths.js"

export const getFile =  {
    getFile(route, type, stats) {
        switch (type) {
            case "markdown": {
                if (stats.mtime.getTime() != this.htmlFilesModified[this.htmlRouteMap[route]].getTime()) {
                    const [htmlFile, fractalBytecode] = this.Marker.convert(`${route}.md`)

                    this.htmlFiles[this.htmlRouteMap[route]] = htmlFile
                    this.fractalBytecodes[this.htmlRouteMap[route]] = fractalBytecode
                    
                    console.log(`[loCache] ${route}.md has been recached`)
                    
                }

                return [this.htmlFiles[this.htmlRouteMap[route]], this.fractalBytecodes[this.htmlRouteMap[route]]]

            }

            case "css": {
                if (stats.mtime.getTime() != this.cssFilesModified[this.cssRouteMap[route]].getTime()) {
                     const fullPath = path.resolve(stylesDirectory, route)
                    const cssFile = fs.readFileSync(fullPath, "utf-8")

                    this.cssFiles[this.cssRouteMap[route]] = cssFile

                }

                return this.cssFiles[this.cssRouteMap[route]]

            }

            case "ico": {
                if (stats.mtime.getTime() != this.iconFilesModified[this.iconRouteMap[route]].getTime()) {
                    const fullPath = path.resolve(iconDirectory, route)
                    const iconFile = fs.readFileSync(fullPath)

                    this.iconFiles[this.iconRouteMap[route]] = iconFile

                }

                return this.iconFiles[this.iconRouteMap[route]]

            }

            case "image": {
                if (stats.mtime.getTime() != this.imageFilesModified[this.imageRouteMap[route]].getTime()) {
                    const fullPath = path.resolve(imageDirectory, route)
                    const imageFile = fs.readFileSync(fullPath)
    
                    this.imageFiles[this.imageRouteMap[route]] = imageFile

                }

                return this.imageFiles[this.imageRouteMap[route]]

            }
        }
    }
}