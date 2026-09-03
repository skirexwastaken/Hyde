import {DEBUG} from "../../constants/constants.js"

// Function that creates a variable
export const setVariableValue = {
    setVariableValue(index, value){
        this.memory[index] = value

        if (DEBUG) console.log(this.memory)
    }
}