export const generateOutputArguments = {
    generateOutputArguments(){
        const outputArguments = {}

        for (const inputArgument in this.inputArguments){
            const variableIndex = this.MemoryManager.memoryMap[inputArgument]
            outputArguments[inputArgument] = this.MemoryManager.memory[variableIndex]
        }

        return outputArguments
    }
}