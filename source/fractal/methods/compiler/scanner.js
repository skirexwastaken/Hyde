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

// Function that verifies the basic syntax integrity of the raw code
// The whole purpose of this function is to catch some of the simpler syntax rules
// This function could be combined with lexer, however I wanted to keep them separate to achieve higher redability and easier implementation of new features which I find easier across less complex functions
export const scanner = {
    scanner(rawCode){
        if (rawCode == "") throw new Error("Source Error: No code to be executed")
        
        // One of the rules it checks is if amount of opening brackers ( matches the amount of closing brackets )
        // Which is a simple check if all function declarations are valid regarding this specific rule

        let openingBracketCount = 0
        let closingBracketCount = 0

        // Defining string is a helper variable to ignore texts that's part of strings

        let definingString = false

        // There is also a check that code block names contain valid symbols

        let insideCodeBlock = false

        for (const byte of rawCode){
            // Checks that code blocks is not opened twice
            if (byte == "[" && definingString == false)
                if (insideCodeBlock == false) {
                    insideCodeBlock = true

                    continue

                } else {
                    throw new Error("Syntax Error: Code block definition: Invalid '['")
                    
                }
            
            // Checks that code block is not closed twice
            if (byte == "]" && definingString == false)
                if (insideCodeBlock == true) {
                    insideCodeBlock = false

                    continue

                } else {
                    throw new Error("Syntax Error: Code block definition: Invalid ']'")
                }
            
            // Checks that string is not defined outside of code block
            if (byte == "'")
                if (insideCodeBlock) {
                    if (definingString == false){
                        definingString = true 

                    } else {
                        definingString = false

                    }

                    continue

                } else {
                    throw new Error("Syntax Error: Code block definition: Invalid '''")

                }
            
            // This is a simple counter that counts the amount of '(' and ')'
            // It also makes sure that function argument definitions are not opened or closed outside of code block
            if (insideCodeBlock && ["(",")"].includes(byte)){
                if (definingString == false && byte == "("){
                    openingBracketCount++
                }

                if (definingString == false && byte == ")"){
                    closingBracketCount++
                }

                continue

            } else if (!insideCodeBlock && ["(",")"].includes(byte)){
                throw new Error(`Syntax Error: Code block definition: Invalid [${byte}]`)

            }
        }

        // The amount of "(" and ")" is compared to make sure all functions are valid
        if (openingBracketCount != closingBracketCount) {
            throw new Error("Syntax Error: Function definition: The number of '(' doesn't match the number of ')' ")
            
        }
    }
}   