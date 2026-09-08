import fs from "node:fs"
import path from "node:path"

import {markdownDirectory} from "../constants/paths.js"

const fullPath = path.resolve(markdownDirectory, "error.md")

export const errorMarkdownExists = {
    errorMarkdownExists () {
        if (!(fs.existsSync(fullPath, "utf-8"))) {
            fs.writeFileSync(fullPath, "# Error\n\nInvalid path, this website doesn't exist", "utf-8")

            console.log("[Hawk] The error file error.md was created")

        }
    }
}