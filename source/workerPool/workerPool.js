import {Worker} from "node:worker_threads"

export class workerPool {
  constructor(workerScript, poolSize) {
    this.workerScript = workerScript
    this.poolSize = poolSize

    this.workers = []

    this.queue = []

    this.initWorkers()

  }

  initWorkers() {
    for (let workerIndex = 0; workerIndex < this.poolSize; workerIndex++) {
      this.addWorker()
      
    }
  }

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


  runTask(data) {
    return new Promise((fulfill, reject) => {
      this.queue.push({data, fulfill, reject})
      this.processQueue()

    })
  }

  processQueue() {
    if (this.queue.length == 0 || this.workers.length == 0){
      return
    
    }

    const worker = this.workers.pop()
    const task = this.queue.shift()

    worker.currentTask = task
    worker.postMessage(task.data)

  }
}