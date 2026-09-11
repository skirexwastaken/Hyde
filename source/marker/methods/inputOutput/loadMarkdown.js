import fs from "node:fs"
import path from "node:path"

import {markdownDirectory} from "../../../constants/paths.js"

export const loadMarkdown = {
    // Function that loads the raw markdown file
    loadMarkdown(filename){
        const markdownFilePath = path.resolve(markdownDirectory, filename)

        return fs.readFileSync(markdownFilePath, "utf8")

    }
}