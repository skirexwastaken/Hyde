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

// This function works similarly to input arguments, it creastes an API between Markdown and Fractal by exporting the changed values of input arguments
export const generateOutputArguments = {
    generateOutputArguments(){
        const outputArguments = {}

        for (const inputArgument in this.inputArguments){
            const variableIndex = this.MemoryManager.memoryMap[inputArgument]
            outputArguments[inputArgument] = this.MemoryManager.memory[variableIndex]
            
        }

        return outputArguments
    }
}