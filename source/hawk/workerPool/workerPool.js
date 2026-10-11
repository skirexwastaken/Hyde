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

import {addWorker} from "./methods/addWorker.js"
import {initWorkers} from "./methods/initWorkers.js"
import {processQueue} from "./methods/processQueue.js"
import {runTask} from "./methods/runTask.js"

export class workerPool {
    constructor(workerScript, poolSize) {
        this.workerScript = workerScript

        this.workers = []

        this.queue = []

        this.initWorkers(poolSize)
    }

}

Object.assign(
    workerPool.prototype,

    addWorker,
    initWorkers,
    processQueue,
    runTask
)