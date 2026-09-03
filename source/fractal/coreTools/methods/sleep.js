export const sleep = {
    sleep(millisecond) {
        const sharedBuffer = new SharedArrayBuffer(4)
        const sharedArray = new Int32Array(sharedBuffer)

        Atomics.wait(sharedArray, 0, 0, millisecond)

    }  
}