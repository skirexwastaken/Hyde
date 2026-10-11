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

// Function that compiles the individual compilation steps and returns the output
export const compile = {
    compile(code) {
        this.codeBlocksFlow = 0 // Counter of how many flow code blocks were created inside lexer function

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