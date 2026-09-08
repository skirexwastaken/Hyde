const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const configPath = path.resolve(currentDirectory, "../config.json")

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const initCache = {
    initCache() {
        const filesToBeCached = JSON.parse(fs.readFileSync(configPath, "utf-8"))

        for (const file of filesToBeCached) {
            this.loCache.cacheFiles(file)

        }
    }
}