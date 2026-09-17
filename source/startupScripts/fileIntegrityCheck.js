import fs from "node:fs"
import path from "node:path"
import {fileURLToPath} from "node:url"

export function fileIntegrityCheck() {
    const currentDirectory = path.dirname(fileURLToPath(import.meta.url))

    const coreProjectFiles = [
        // Source

            // Constants
        
            "../../source/constants/macros.js",
            "../../source/constants/paths.js"
    ]

    for (const coreFile of coreProjectFiles) {
        const fullFilePath = path.resolve(currentDirectory, coreFile)

        if (!(fs.existsSync(fullFilePath))) {
            console.info(`[File Integrity Check] File ${coreFile} is missing`)

            process.exit()

        }
    }

    console.log("[File Integrity Check] All files were found")
    
}