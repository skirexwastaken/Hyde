import {loCache} from "../loCache/loCache.js"
import {Mytharis} from "../mytharis/mytharis.js"

import {initCache} from "./methods/init/initCache.js"
import {initServer} from "./methods/init/initServer.js"

import {runServer} from "./methods/runServer.js"

export class Hawk{
    constructor() {
        this.loCache = new loCache()
        this.mytharis = new Mytharis()
        
        this.initCache()

    }
}

Object.assign(
    Hawk.prototype,

    initCache,
    initServer,

    runServer
)