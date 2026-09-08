export const interpreter = {
    // Function that goes thru one instruction at a time and executes it using the execute function
    interpreter(instructionSets, metaData){
        console.log("[Fractal] Execution started")

        this.MemoryManager.allocateMemorySpace(metaData["variableCount"])

        this.loadInputArguments()

        let codeBlocks = [] // Variable that contains all code blocks
        this.codeBlockMap = {} // Variable that stores name:index of code blocks

        // Execution stack is a array of 2D arrays
        // Each 2D array contains:
        //  Index of the currently executed code block
        //  Index of currently executed instruction inside of this specific code block
        // This esentially allows recursion
        this.executionStack = []

        this.stack = [] // REgular stack that holds return values of functions

        // Loading the code blocks from instructionSets dictionary, adding them to codeBlocks array and saving their path to codeBlocksMap
        let codeBlockCounter = 0
        for (const codeBlockName in instructionSets){
            this.codeBlockMap[codeBlockName] = codeBlockCounter

            codeBlocks.push(instructionSets[codeBlockName])

            codeBlockCounter++
        }

        // Main is executed first
        this.executionStack.push([this.codeBlockMap["main"],0])

        // Executing individual instructions
        // At each cycle of the while loop, the currently executed code block index and currently executed instruction index is grabed
        while (this.executionStack.length != 0 ){
            const codeBlockIndex = this.executionStack[this.executionStack.length - 1][0]
            const codeBlockInstructionIndex = this.executionStack[this.executionStack.length - 1][1]++

            this.execute(codeBlocks[codeBlockIndex][codeBlockInstructionIndex])
        }

        console.log("[Fractal] Execution finished")

        
        // Generating output arguments, which are the values of the inputArguments at the end of the script
        return [this.generateOutputArguments(), this.coreTools.shellOutputBuffer]

    }
}