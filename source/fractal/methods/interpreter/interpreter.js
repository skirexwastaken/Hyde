/*
GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2026 Daniel Hora

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

import {instructionLimitEnabled, instructionLimit} from "../../constants/instructionLimit.js"

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

        // Instruction limit
        // You can set an option instruction limit to while loops freezing worker
        // While enabling is recommended you can customize how many instructions should run before a script hits it

        let instructionCounter = 0

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

            instructionCounter++

            if (instructionLimitEnabled == true) {
                if (instructionCounter == instructionLimit) {
                    break

                }
            }
        }

        // Generating output arguments, which are the values of the inputArguments at the end of the script
        return [this.generateOutputArguments(), this.coreTools.shellOutputBuffer]

    }
}