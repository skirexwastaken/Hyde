import fs from "node:fs"
import path from "node:path"

import {markdownDirectory, stylesDirectory, iconDirectory, imageDirectory} from "../../../constants/paths.js"

export const getFile =  {
    getFile(route, type) {
        switch (type) {
            case "html": {
                const fullPathMarkdown = path.resolve(markdownDirectory, `${route}.md`)
                const statsMarkdown = fs.statSync(fullPathMarkdown)

                if (this.htmlFilesModified[this.htmlRouteMap[route]].getTime() != statsMarkdown.mtime.getTime()) {
                    const [htmlFile, fractalBytecode] = this.Marker.convert(`${route}.md`)

                    this.htmlFiles[this.htmlRouteMap[route]] = htmlFile
                    this.fractalBytecodes[this.htmlRouteMap[route]] = fractalBytecode
                    
                    console.log(`[loCache] ${route}.md has been recached`)
                    
                }

                return this.htmlFiles[this.htmlRouteMap[route]]

            }

            case "bytecode": {
                const fullPathMarkdown = path.resolve(markdownDirectory, `${route}.md`)
                const statsMarkdown = fs.statSync(fullPathMarkdown)

                if (this.htmlFilesModified[this.htmlRouteMap[route]].getTime() != statsMarkdown.mtime.getTime()) {
                    const [htmlFile, fractalBytecode] = this.Marker.convert(`${route}.md`)

                    this.htmlFiles[this.htmlRouteMap[route]] = htmlFile
                    this.fractalBytecodes[this.htmlRouteMap[route]] = fractalBytecode
                    
                    console.log(`[loCache] ${route}.md has been recached`)
                    
                }

                return this.fractalBytecodes[this.htmlRouteMap[route]]

            }

            case "css": {
                const fullPath = path.resolve(stylesDirectory, route)
                const cssStats = fs.statSync(fullPath)

                if (cssStats.mtime.getTime() != this.cssFilesModified[this.cssRouteMap[route]].getTime()) {
                    const cssFile = fs.readFileSync(fullPath, "utf-8")

                    this.cssFiles[this.cssRouteMap[route]] = cssFile

                }

                return this.cssFiles[this.cssRouteMap[route]]

            }

            case "ico": {
                const fullPath = path.resolve(iconDirectory, route)
                const iconStats = fs.statSync(fullPath)

                if (iconStats.mtime.getTime() != this.iconFilesModified[this.iconRouteMap[route]].getTime()) {
                    const iconFile = fs.readFileSync(fullPath)

                    this.iconFiles[this.iconRouteMap[route]] = iconFile

                }

                return this.iconFiles[this.iconRouteMap[route]]

            }

            case "image": {
                const fullPath = path.resolve(imageDirectory, route)
                const imageStats = fs.statSync(fullPath)

                if (imageStats.mtime.getTime() != this.imageFilesModified[this.imageRouteMap[route]].getTime()) {
                    const imageFile = fs.readFileSync(fullPath)
    
                    this.imageFiles[this.imageRouteMap[route]] = imageFile

                }

                return this.imageFiles[this.imageRouteMap[route]]

            }
        }
    }
}