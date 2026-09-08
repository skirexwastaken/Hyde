const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const initCachePath = path.resolve(currentDirectory, "../constants/initCache.json")

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const initCache = {
    initCache() {
        const filesToBeCached = JSON.parse(fs.readFileSync(initCachePath, "utf-8"))

        for (const file of filesToBeCached) {
            this.loCache.cacheFiles(file)

        }
    }
}