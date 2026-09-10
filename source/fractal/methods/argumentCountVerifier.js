import {FUNCTIONS} from "../constants/constants.js"

export const argumentCountVerifier = {
    // Part of lexer, it counts arguments of individual functions
    // The reason behing this is to check if argument counts are met and to determine how many argument do functions with variable argument counts, for example print, have in this specific instance
    argumentCountVerifier(tokenizedCode){
        let codeBlocks = Object.keys(tokenizedCode)
        let codeBlocksIndex = 0

        while(codeBlocksIndex < codeBlocks.length){
            const codeBlockName = codeBlocks[codeBlocksIndex]

            for (let index = 0; index < tokenizedCode[codeBlockName].length; index += 2){

                // Removing invalid strings / numbers, for example "some string" "print" ["Hello World"]
                if (!(tokenizedCode[codeBlockName][index] in FUNCTIONS) || !(tokenizedCode[codeBlockName][index + 1] instanceof Array)){
                    tokenizedCode[codeBlockName].splice(index,1)
                    index -= 2
                    continue
                }

                this.argumentCounter(tokenizedCode, tokenizedCode[codeBlockName], index, tokenizedCode[codeBlockName][index + 1])

            }

            codeBlocks = Object.keys(tokenizedCode)
            codeBlocksIndex++
        }
    }
}