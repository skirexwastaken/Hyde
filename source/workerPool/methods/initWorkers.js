export const initWorkers = {
    initWorkers(poolSize) {
        for (let workerIndex = 0; workerIndex < poolSize; workerIndex++) {
        this.addWorker()
        
        }
    }
}