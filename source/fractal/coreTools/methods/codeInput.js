// Function that loads the raw code string into memory
export const codeInput = {
    codeInput(code){
        const codeWithoutStrings = code.replace(/'[^']*'/g,"")

        if (!(codeWithoutStrings.includes("[")) && !(codeWithoutStrings.includes("]"))) code = `[${code}]`

        return code
    }
}