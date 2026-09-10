import {FUNCTIONS} from "../constants/constants.js"

// This function translates the raw string into the following function and argument format [function [arguments]] and separates code into code blocks
// For example [print['Hello World!']]
// This format is beneficial for the next stage of compilation process, the argument count checking
export const lexer = {
    // This function converts the raw code into a dictionary of code blocks
    lexer(rawCode){

        // Scanner checks for basic syntax ruler
        this.scanner(rawCode)

        // The output dictionary of lexer containing all code blocks
        let tokenizedCode = {}

        let definingCodeBlock = true
        let codeBlockName = ""

        let keyword = ""
        let currentDepth = 0

        for (const byte of rawCode){
            if (definingCodeBlock == true){
                if (byte == "["){
                    codeBlockName = codeBlockName.trim()

                    // Regex test that makes sure codeBlockName only contains standard alphabet letters
                    if (!(/^[a-zA-Z]+$/.test(codeBlockName))) {
                        throw new Error( `Syntax Error: Code block ${codeBlockName} contains invalid character}s`)

                    }
                    
                    // If no code block name is specified, the code block name is automatically set to main
                    // This feature can be combined with not having to use [] around simple scripts
                    if (codeBlockName == "")  {
                        codeBlockName = "main"

                    }

                    tokenizedCode[codeBlockName] = []
                    definingCodeBlock = false


                } else {
                    codeBlockName += byte

                }

            } else {
                if (byte == "]" && keyword == ""){
                    codeBlockName = ""
                    definingCodeBlock = true
                
                // Function name is at the end of the line, for example ...print]
                } else if (byte == "]" && keyword != "" && keyword[0] != "'") {
                    throw new Error(`Syntax Error: Function [${keyword}] has no arguments or is an invalid function`)
                
                // Keyword is a potential function name, variable name or a closed string
                } else if (["(", ")", ","].includes(byte) && (keyword[0] != "'" || (keyword[0] == "'" && keyword[keyword.length - 1] == "'"))) {
                    let currentArguments = tokenizedCode[codeBlockName]
                    let temporaryDepth = currentDepth

                    // Getting to the current argument array, for example [print[merge[ --> here <-- ]]]
                    while (temporaryDepth > 0){
                        currentArguments = currentArguments[currentArguments.length -1]
                        temporaryDepth -= 1

                    }

                    // Keyword is either not a function but has arguments or
                    // Keyword is a function but has no arguments
                    if ((!(keyword in FUNCTIONS) && byte == "(") || keyword in FUNCTIONS && byte != "(") {
                        throw new Error(`Syntax Error: Function [${keyword}] is an invalid function`)

                    }

                    // Checking if keyword that would be later interpreted as a variable doesn't contain function name inside of itself
                    for (const func in FUNCTIONS){
                        if ((keyword).includes(func) && keyword != func && keyword[0] != "'") {
                            throw new Error(`Syntax Error: Function [${keyword}] is an invalid function`)

                        }
                    }

                    // Each string can be a dollar string, meaning variables can be embdeded inside of it using the ${} symbol
                    // In that case the string is split into separate parts and then combined using the con function
                    // This is to allow an easier way of merging variables into strings
                    if (keyword[0] == "'"){
                        let dollarString = keyword.split(/(\${.*?})/)

                        // No instance of ${}
                        if (dollarString.length == 1){
                            if (keyword != "") currentArguments.push(keyword)

                        } else {

                            // Replacing ${} with variable names
                            for (const index in dollarString) {
                                const currentToken = dollarString[index]

                                // Removing the ${ and } that's around the variable name, making it a valid variable name
                                if (currentToken.startsWith("${") && currentToken.endsWith("}")){
                                    dollarString[index] = currentToken.slice(2, currentToken.length - 1)

                                } else {

                                    // Making sure the individual substrings that will be later merged are valid
                                    if (currentToken[0] != "'"){
                                        dollarString[index] = `'${currentToken}`

                                    } 
                                    
                                    if (currentToken[currentToken.length - 1] != "'"){
                                        dollarString[index] = `${currentToken}'`

                                    }
                                }
                            }

                            // Combining the sub strings and variables into one single string using the con function
                            currentArguments.push("merge")
                            currentArguments.push(dollarString)

                        }

                    } else {
                        if (keyword != "") currentArguments.push(keyword)

                    }

                    keyword = ""

                    if (byte == "("){
                        currentArguments.push([])
                        currentDepth++

                    } else if (byte == ")"){
                        currentDepth--

                    }
                    
                } else {
                    if (byte != " " || (byte == " " && keyword[0] == "'")) keyword += byte
                }
            }
        }

        if (tokenizedCode["main"] == undefined) {
            throw new Error("Block Error: No main code block declared")
            
        }

        if (tokenizedCode["main"].length == 0) {
            throw new Error("Block Error: Main code block is empty")

        }
            
        // Checks if the amount of arguments matches the defined amount of arguments a function should get
        this.argumentCountVerifier(tokenizedCode)

        return tokenizedCode
    }
}