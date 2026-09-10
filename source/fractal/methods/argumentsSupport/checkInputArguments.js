import {FUNCTIONS} from "../../constants/functions.js"

// Function that makes sure that input arguments are in a form of an object variableName : variableValue
// Additionaly there's a standard variable check that makes sure function names are not part of a variable name
export const checkInputArguments = {
    checkInputArguments(inputArguments){
        if (!(inputArguments instanceof Object)) {
            throw new Error("Argument Error: Input arguments are not an Object")

        }

        for (const inputArgument in inputArguments){
            if (!(["string", "number"].includes(typeof inputArguments[inputArgument]))) {
                throw new Error("Argument Error: One of the arguments is of an invalid data type")

            }

            for (const func in FUNCTIONS){
                if (inputArgument.includes(func)) {
                    throw new Error(`Syntax Error: Variable [${inputArgument}] contains a function name`)

                }
            } 
        }

        this.inputArguments = inputArguments
    }
}