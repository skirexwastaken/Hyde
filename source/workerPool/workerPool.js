import {Worker} from "node:worker_threads"

export class workerPool {
  constructor(workerScript, poolSize) {
    this.workerScript = workerScript;
    this.poolSize = poolSize;
    this.workers = [];
    this.taskQueue = [];
    this.freeWorkers = [];

    this.initializeWorkers();
  }

  initializeWorkers() {
    for (let i = 0; i < this.poolSize; i++) {
      this.addWorker();
    }
  }

  addWorker() {
    const worker = new Worker(this.workerScript);
    worker.on('message', (result) => this.handleWorkerMessage(worker, result));
    worker.on('error', (err) => this.handleWorkerError(worker, err));
    this.workers.push(worker);
    this.freeWorkers.push(worker);
  }

  handleWorkerMessage(worker, result) {
    const { resolve } = worker.currentTask;
    resolve(result);
    worker.currentTask = null;
    this.freeWorkers.push(worker);
    this.processQueue();
  }

  handleWorkerError(worker, error) {
    if (worker.currentTask) {
      const { reject } = worker.currentTask;
      reject(error);
      worker.currentTask = null;
    }
    this.workers = this.workers.filter((w) => w !== worker);
    this.freeWorkers = this.freeWorkers.filter((w) => w !== worker);
    this.addWorker();
    this.processQueue();
  }

  runTask(data) {
    return new Promise((resolve, reject) => {
      this.taskQueue.push({ data, resolve, reject });
      this.processQueue();
    });
  }

  processQueue() {
    if (this.taskQueue.length === 0 || this.freeWorkers.length === 0) return;

    const worker = this.freeWorkers.pop();
    const task = this.taskQueue.shift();
    worker.currentTask = task;
    worker.postMessage(task.data);
  }

  async destroy() {
    await Promise.all(this.workers.map((w) => w.terminate()));
  }
}
