import {loCache} from "../loCache/loCache.js"
import {Mytharis} from "../mytharis/mytharis.js"
import {workerPool} from "../workerPool/workerPool.js"

import {initServer} from "./methods/init/initServer.js"

import {runServer} from "./methods/runServer.js"

export class Hawk{
    constructor() {
        this.loCache = new loCache()
        this.mytharis = new Mytharis()
        this.workerPool = new workerPool("./source/hawk/methods/assembleResponse.js", process.env.WORKER_POOL_THREADS)

    }
}

Object.assign(
    Hawk.prototype,

    initServer,

    runServer
)