import {fileURLToPath} from "node:url"
import path from "node:path"

import {loCache} from "../loCache/loCache.js"
import {Mytharis} from "../mytharis/mytharis.js"
import {workerPool} from "./workerPool/workerPool.js"

import {initServer} from "./methods/initServer.js"
import {runServer} from "./methods/runServer.js"

export class Hawk{
    constructor() {
        this.loCache = new loCache()
        this.mytharis = new Mytharis()

        const currentDirectory = path.dirname(fileURLToPath(import.meta.url))
        const workerScriptPath = path.resolve(currentDirectory, "./methods/assembleResponse.js")

        this.workerPool = new workerPool(workerScriptPath, process.env.WORKER_POOL_THREADS)

    }
}

Object.assign(
    Hawk.prototype,

    initServer,
    runServer
)