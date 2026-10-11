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

import {allocateMemorySpace} from "./methods/allocateMemorySpace.js"
import {getVariableValue} from "./methods/getVariableValue.js"
import {setVariableValue} from "./methods/setVariableValue.js"

// Memory manager of Fractal
// During compilation variables are saved to memory map in the following format name:index
// Inside of the compiled code, the names are replaced with those indexes so during execution the interpreter asks for a variable at a specific index in this.memory
// The reason behind this is that direct indexing is faster than dictionary lookup
export class MemoryManager {
    constructor(){
        this.memoryMap = {}
        this.memory = []

    }
}

Object.assign(
    MemoryManager.prototype,
    
    allocateMemorySpace,
    getVariableValue,
    setVariableValue
)