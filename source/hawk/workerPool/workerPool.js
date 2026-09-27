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