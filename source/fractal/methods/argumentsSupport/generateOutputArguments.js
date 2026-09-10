// This function works similarly to input arguments, it creastes an API between Markdown and Fractal by exporting the changed values of input arguments
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