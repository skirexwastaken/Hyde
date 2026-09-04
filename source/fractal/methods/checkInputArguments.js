import {FUNCTIONS} from "../constants/constants.js"

// Input arguments are in a form of an object variableName : variableValue
export const checkInputArguments = {
    checkInputArguments(inputArguments){
        if (!(inputArguments instanceof Object)) throw new Error("Argument Error: Input arguments are not an Object")

        for (const inputArgument in inputArguments){
            if (!(["string", "number"].includes(typeof inputArguments[inputArgument]))) throw new Error("Argument Error: One of the arguments is of an invalid data type")

            for (const func in FUNCTIONS){
                if (inputArgument.includes(func)) throw new Error(`Syntax Error: Variable [${inputArgument}] contains a function name`)
            } 
        }

        this.inputArguments = inputArguments
    }
}