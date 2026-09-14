export const processQueue = {
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