/*
GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2026 Daniel Hora

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

import fs from "node:fs";
import path from "node:path";

import {imageDirectory} from "../../../constants/paths.js"

export const cacheImage = {
    cacheImage(route, stats) {
        const fullPath = path.resolve(imageDirectory, `${route}.png`)
        const imageFile = fs.readFileSync(fullPath)

        this.imageRouteMap[route] = this.imageCacheCounter++
        this.imageFiles.push(imageFile)
        this.imageFilesModified.push(stats.mtime)

        console.log(`[loCache] ${route}.png has been cached`)

    }
}