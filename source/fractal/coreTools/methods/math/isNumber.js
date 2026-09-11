// Function that checks if an argument is a number and if not applies the convertToNumberUsingAscii function on it
// This function is used for example when parsing an argument to a mathematical function such as add where the argument can't be a string
export const isNumber = {
    isNumber(argument){
        if (isNaN(argument)){
            return this.convertToNumberUsingAscii(argument)

        } else {
            return Number(argument)
        }
    }
} 