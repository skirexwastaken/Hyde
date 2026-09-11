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