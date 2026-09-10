// Function that compiles the individual compilation steps and returns the output
export const compile = {
    compile(code) {
        this.codeBlocksIf = 0 // Counter of how many if code blocks were created inside lexer function
        this.codeBlocksElse = 0
        this.codeBlocksLambda = 0

        this.currentLineIndex
        this.codeBlockName
        
        // 1. Loading raw string
        const rawCode = this.coreTools.codeInput(code)

        // 2. Converting code into tokenized code and checking for syntax rules
        const tokenizedCode = this.lexer(rawCode)

        // 3. Turning the tokenized code into single dictionary and replacing keywords with direct function calls
        const [instructionSets, metaData] = this.parser(tokenizedCode)

        // 4. Returning the compiled bytecode
        return [instructionSets, metaData]
    }
}