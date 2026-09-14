// Interpreted goes thru the executionStack and executes all functions from it
// Fractal interpreter uses executionStack, which acts as a pointer to the currently executed code block and its specific function
// The interpreter uses standard LIFO stack to hold values
export const interpreter = {
    interpreter(instructionSets, metaData){
        // Allocating memory and loading input arguments into memory
        this.MemoryManager.allocateMemorySpace(metaData["variableCount"])
        this.loadInputArguments()

        // Variable that stores name:index of code blocks
        this.codeBlockMap = {}

        // Variable that contains all code blocks which are indexable by getting the index from codeBlockMap
        let codeBlocks = []

        // Execution stack is a array of 2D arrays
        // Each 2D array contains:
        //  Index of the currently executed code block
        //  Index of currently executed instruction inside of this specific code block
        // This esentially allows recursion without the standard JS recursion limit
        this.executionStack = []

        // Regular stack that holds return values of functions using the LIFO logic
        this.stack = []

        // Loading the code blocks from instructionSets dictionary, adding them to codeBlocks array and saving their path to codeBlocksMap
        let codeBlockCounter = 0
        for (const codeBlockName in instructionSets){
            this.codeBlockMap[codeBlockName] = codeBlockCounter
            codeBlocks.push(instructionSets[codeBlockName])

            codeBlockCounter++
        }

        // Adding main into executionStack
        this.executionStack.push([this.codeBlockMap["main"],0])

        // Executing individual instructions
        // At each cycle of the while loop, the currently executed code block index and currently executed instruction index is grabed
        while (this.executionStack.length != 0 ){
            const codeBlockIndex = this.executionStack[this.executionStack.length - 1][0]
            const codeBlockInstructionIndex = this.executionStack[this.executionStack.length - 1][1]++

            this.execute(codeBlocks[codeBlockIndex][codeBlockInstructionIndex])
        }

        // Generating output arguments, which are the values of the inputArguments at the end of the script
        return [this.generateOutputArguments(), this.coreTools.shellOutputBuffer]

    }
}