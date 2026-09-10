// Creates empty space for a variables in memory
export const allocateMemorySpace = {
    allocateMemorySpace(number){
        for (let index = 0; index < number; index++) {
            this.memory.push(null)
            
        }
    }
}    