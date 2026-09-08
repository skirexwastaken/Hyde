import {loCache} from "../loCache/loCache.js"
import {Mytharis} from "../mytharis/mytharis.js"

import {errorMarkdownExists} from "./methods/errorMarkdownExists.js"
import {initCache} from "./methods/initCache.js"
import {initServer} from "./methods/initServer.js"
import {runServer} from "./methods/runServer.js"

export class Hawk{
    constructor() {
        this.loCache = new loCache()
        this.mytharis = new Mytharis()
        
        this.errorMarkdownExists()
        this.initCache()

    }
}

Object.assign(
    Hawk.prototype,
    errorMarkdownExists,
    initCache,
    initServer,
    runServer
)