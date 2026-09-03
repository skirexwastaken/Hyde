// Function that checks if an argument is a number and if not applies the convertToNumberUsingAscii function on it
export const isNumber = {
    isNumber(argument){
        let number

        if (isNaN(argument)){
            number = this.convertToNumberUsingAscii(argument)

        } else {
            number = Number(argument)
        }

        return number
    }
} 