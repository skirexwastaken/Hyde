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

import {FUNCTIONS} from "../../constants/functions.js"

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

            // This is needed if a new code block is created
            codeBlocks = Object.keys(tokenizedCode)
            codeBlocksIndex++
        }
    }
}