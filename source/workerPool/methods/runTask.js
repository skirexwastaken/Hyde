export const runTask = {
    runTask(data) {
        return new Promise((fulfill, reject) => {
        this.queue.push({data, fulfill, reject})
        this.processQueue()

        })
    }
}