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