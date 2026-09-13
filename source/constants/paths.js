import path from "node:path"
import { fileURLToPath } from "node:url"

export const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
export const markdownDirectory = path.resolve(currentDirectory, "../../templates/markdown/")
export const htmlDirectory = path.resolve(currentDirectory, "../../templates/html/")
export const scriptDirectory = path.resolve(currentDirectory, "../../static/scripts/")
export const stylesDirectory = path.resolve(currentDirectory, "../../static/styles/")
export const iconDirectory = path.resolve(currentDirectory, "../../static/icons")
export const imageDirectory = path.resolve(currentDirectory, "../../static/images")

export const initCachePath = path.resolve(currentDirectory, "../constants/initCache.json")