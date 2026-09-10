import fs from "node:fs"
import path from "node:path"

import { initCachePath } from "../../../constants/paths.js"

// This function allows to cache specific files at startup allowing users to access them straight away without the caching delay
export const initCache = {
    initCache() {
        const filesToBeCached = JSON.parse(fs.readFileSync(initCachePath, "utf-8"))

        for (const file of filesToBeCached) {
            this.loCache.cacheFiles(file)

        }

        console.log(`[Hawk] Cache has been initialized`)
    }
}