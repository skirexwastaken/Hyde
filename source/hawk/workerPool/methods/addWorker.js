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