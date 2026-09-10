import path from "node:path"
import {fileURLToPath} from "node:url"

export const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
export const markdownDirectory = path.resolve(currentDirectory, "../../../templates/markdown")
export const stylesDirectory = path.resolve(currentDirectory, "../../../static/styles/")