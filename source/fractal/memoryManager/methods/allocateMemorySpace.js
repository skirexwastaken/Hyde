// Creates empty space for a variable in memory
export const allocateMemorySpace = {
    allocateMemorySpace(number){
        for (let index = 0; index < number; index++) this.memory.push(null)

    }
}    