export const interpreter = {
    // Function that goes thru one instruction at a time and executes it using the execute function
    interpreter(){
        this.MemoryManager.allocateMemorySpace(this.metaData["variableCount"])

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
        for (const codeBlockName in this.instructionSets){
            this.codeBlockMap[codeBlockName] = codeBlockCounter

            codeBlocks.push(this.instructionSets[codeBlockName])

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
    }
}