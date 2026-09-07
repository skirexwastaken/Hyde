import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));

const markdownDirectory = path.resolve(currentDirectory, "../../../templates/markdown")

export const getMarkdown = {
    // Function that loads the raw markdown file
    getMarkdown(filename){
        const fullPath = path.resolve(markdownDirectory, filename)

        return fs.readFileSync(fullPath, "utf8")

    }
}