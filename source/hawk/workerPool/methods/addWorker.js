import {Worker} from "node:worker_threads"

export const addWorker = {
    addWorker() {
        const worker = new Worker(this.workerScript)

        worker.on('message', (result) => {
            const {fulfill} = worker.currentTask

            fulfill(result)

            worker.currentTask = null
            this.workers.push(worker)
            
            this.processQueue()

        })

        worker.on('error', (error) => {
            if (worker.currentTask) {
                const { reject } = worker.currentTask
                reject(error)

            }

            worker.terminate()

            this.workers = this.workers.filter((w) => w !== worker)

            this.addWorker()
            this.processQueue()
        
        })

        this.workers.push(worker)

    }
}