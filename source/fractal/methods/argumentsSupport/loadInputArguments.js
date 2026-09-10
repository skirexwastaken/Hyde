// Function that loads the input arguments from a dictionary into memory
// The purpose of input arguments is to create a sort of API between Markdown and Fractal

export const loadInputArguments = {
    loadInputArguments() {
        let variableCounter = 0

        // Loading input arguments into memory
        for (const inputArgument in this.inputArguments){
            this.MemoryManager.memoryMap[inputArgument] = variableCounter
            this.MemoryManager.setVariableValue(variableCounter, this.inputArguments[inputArgument])
            variableCounter++
        }

        return variableCounter
    }
}