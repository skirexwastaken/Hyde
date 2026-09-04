import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const directoryName = path.dirname(fileURLToPath(import.meta.url));

const templatesDirectiory = path.resolve(directoryName, "../../../templates/markdown")

export const getMarkdown = {
    // Function that loads the raw markdown file
    getMarkdown(filename){

        const fullPath = path.resolve(templatesDirectiory, filename)

        return fs.readFileSync(fullPath, "utf8")

    }
}