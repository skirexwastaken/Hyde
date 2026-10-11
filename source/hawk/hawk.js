/*
GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2026 Daniel Hora

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

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