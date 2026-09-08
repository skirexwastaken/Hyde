import fs from "node:fs";
import path from "node:path"

import {markdownDirectory} from "../constants/paths.js"

export const getMarkdown = {
    // Function that loads the raw markdown file
    getMarkdown(filename){
        const fullPath = path.resolve(markdownDirectory, filename)

        return fs.readFileSync(fullPath, "utf8")

    }
}