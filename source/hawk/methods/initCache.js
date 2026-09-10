import fs from "node:fs"
import path from "node:path"

import { initCachePath } from "../../constants/paths.js"

export const initCache = {
    initCache() {
        const filesToBeCached = JSON.parse(fs.readFileSync(initCachePath, "utf-8"))

        for (const file of filesToBeCached) {
            this.loCache.cacheFiles(file)

        }

        console.log(`[Hawk] Cache has been initialized`)
    }
}