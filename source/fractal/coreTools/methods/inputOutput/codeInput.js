// Function that loads the raw code string into memory
export const codeInput = {
    codeInput(code){
        // This function loads the code and also implements support for no codeblocks
        // This is done by removing  strings and checking if there are any instances of the [
        // The reason behind this is to allow simple scripts, such as simple print('Hello World'), to be written more easily
        const codeWithoutStrings = code.replace(/'[^']*'/g,"")

        if (!(codeWithoutStrings.includes("[")) && !(codeWithoutStrings.includes("]"))) code = `[${code}]`

        return code
    }
}