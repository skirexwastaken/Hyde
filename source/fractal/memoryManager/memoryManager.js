import {allocateMemorySpace} from "./methods/allocateMemorySpace.js"
import {getVariableValue} from "./methods/getVariableValue.js"
import {setVariableValue} from "./methods/setVariableValue.js"

// Memory manager of Fractal
export class MemoryManager {
    constructor(){
        this.memory = []

    }
}

Object.assign(
    MemoryManager.prototype,
    allocateMemorySpace,
    getVariableValue,
    setVariableValue
)