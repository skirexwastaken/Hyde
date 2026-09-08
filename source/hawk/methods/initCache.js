import fs from "node:fs"
import path from "node:path"

import {currentDirectory} from "../constants/paths.js"

const initCachePath = path.resolve(currentDirectory, "../constants/initCache.json")

export const initCache = {
    initCache() {
        const filesToBeCached = JSON.parse(fs.readFileSync(initCachePath, "utf-8"))

        for (const file of filesToBeCached) {
            this.loCache.cacheFiles(file)

        }
    }
}