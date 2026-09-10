import {FUNCTIONS, CFUNCTIONS} from "../constants/constants.js"

export const argumentCounter = {
    // Recursive function used in argumentCountVerifier
    argumentCounter(tokenizedCode, functionArray, functionIndex, arg){
        let argumentCounter = 0

        // When the first agument of If function is a function, it is turned into a separate code block and then the name of the code block is added as the new first argument of the If function
        if (CFUNCTIONS.includes(functionArray[functionIndex])){
            if (functionArray[functionIndex + 1][0] in FUNCTIONS && functionArray[functionIndex + 1][2]){
                const ifCodeBlockName = `ifCodeBlock${this.codeBlocksFlow++}`
                const elseCodeBlockName = `elseCodeBlock${this.codeBlocksFlow++}`

                tokenizedCode[ifCodeBlockName] = [functionArray[functionIndex + 1][0], functionArray[functionIndex + 1][1]]
                tokenizedCode[elseCodeBlockName] = [functionArray[functionIndex + 1][2], functionArray[functionIndex + 1][3]]
                

                for (let index = 0; index < 4; index++){
                    functionArray[functionIndex + 1].shift()

                }

                functionArray[functionIndex + 1].unshift(`'${elseCodeBlockName}'`)
                functionArray[functionIndex + 1].unshift(`'${ifCodeBlockName}'`)
            }
        }

        // Counting arguments
        for (let argumentIndex = 0; argumentIndex < arg.length; argumentIndex ++){
            const argument = arg[argumentIndex]

            if (argument instanceof Array){
                this.argumentCounter(tokenizedCode, arg, argumentIndex - 1, argument)

            } else {
                argumentCounter += 1
            }
        }

        // Argument count check
        if (FUNCTIONS[functionArray[functionIndex]] == null){
            functionArray[functionIndex] = `${functionArray[functionIndex]}${argumentCounter}`

        } else {
            if (FUNCTIONS[functionArray[functionIndex]] > argumentCounter) {
                throw new Error(`Syntax Error: Function [${functionArray[functionIndex]}] is missing arguments`)

            } else if (FUNCTIONS[functionArray[functionIndex]] < argumentCounter){
                throw new Error(`Syntax Error: Function [${functionArray[functionIndex]}] has an additional arguments`)
            }
        }
    }
}