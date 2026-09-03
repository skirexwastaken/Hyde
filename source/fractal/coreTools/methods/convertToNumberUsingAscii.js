// Function that converts a string into a sum of its characters ascii values
export const convertToNumberUsingAscii = {
    convertToNumberUsingAscii(string){
        let number = 0

        for (const char of string){
            if (isNaN(char)){
                number += Number(char.charCodeAt(0))
            } else {
                number += Number(char)
            }
        }

        return number
    }
}