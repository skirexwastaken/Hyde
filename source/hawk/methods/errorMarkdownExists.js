const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
const markdownPath = path.resolve(currentDirectory, "../../../templates/markdown/")

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

export const errorMarkdownExists = {
    errorMarkdownExists () {
        if (!(fs.existsSync(`${markdownPath}/error.md`, "utf-8"))) {
            fs.writeFileSync(`${markdownPath}/error.md`, "# Error\n\nInvalid path, this website doesn't exist", "utf-8")

        }
    }
}