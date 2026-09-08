import {loCache} from "../loCache/loCache.js"
import {Mytharis} from "../mytharis/mytharis.js"

import {initServer} from "./methods/initServer.js"
import {runServer} from "./methods/runServer.js"

import fs from "node:fs"
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(currentDirectory, "./config.json")

export class Hawk{
    constructor() {
        this.loCache = new loCache()
        this.mytharis = new Mytharis()
        
        const filesToBeCached = JSON.parse(fs.readFileSync(configPath, "utf-8"))

        for (const file of filesToBeCached) {
            this.loCache.cacheFiles(file)

        }
    }
}

Object.assign(
    Hawk.prototype,
    initServer,
    runServer
)