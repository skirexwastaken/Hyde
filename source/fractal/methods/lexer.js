import {FUNCTIONS} from "../constants/constants.js"

export const lexer = {
    // This function converts the raw code into a dictionary of code blocks
    lexer(rawCode){

        // Scanner checks for basic syntax ruler
        this.scanner(rawCode)

        // The output dictionary of lexer
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
                    if (!(/^[a-zA-Z]+$/.test(codeBlockName))) throw new Error( `Syntax Error: Code block ${codeBlockName} contains invalid characters`)

                    if (codeBlockName == "") codeBlockName = "main"

                    tokenizedCode[codeBlockName] = []
                    definingCodeBlock = false


                } else {
                    codeBlockName += byte
                }

            } else {
                if (byte == "]" && keyword == ""){
                    codeBlockName = ""
                    definingCodeBlock = true
                
                // Function name is at the end of the line
                } else if (byte == "]" && keyword != "" && keyword[0] != "'" && isNaN(keyword)) {
                    throw new Error(`Syntax Error: Function [${keyword}] has no arguments or is an invalid function`)

                } else if (["(", ")", ","].includes(byte) && (keyword[0] != "'" || (keyword[0] == "'" && keyword[keyword.length - 1] == "'"))) {
                    let currentArguments = tokenizedCode[codeBlockName]
                    let temporaryDepth = currentDepth

                    while (temporaryDepth > 0){
                        currentArguments = currentArguments[currentArguments.length -1]
                        temporaryDepth -= 1
                    }

                    if ((!(keyword in FUNCTIONS) && byte == "(") || keyword in FUNCTIONS && byte != "(") throw new Error(`Syntax Error: Function [${keyword}] is an invalid function`)

                    for (const func in FUNCTIONS){
                        if ((keyword).includes(func) && keyword != func && keyword[0] != "'") throw new Error(`Syntax Error: Function [${keyword}] is an invalid function`)

                    }

                    // Each string can be a dollar string, meaning variables can be embdeded inside of it using the ${} symbol
                    // In that case the string is split into separate parts and then combined using the con function
                    if (keyword[0] == "'"){
                        let dollarString = keyword.split(/(\${.*?})/)

                        // No instance of ${}
                        if (dollarString.length == 1){
                            if (keyword != "") currentArguments.push(keyword)

                        } else {

                            // Replacing ${} with variable names
                            for (const index in dollarString) {
                                if (dollarString[index].startsWith("${") && dollarString[index].endsWith("}")){
                                    dollarString[index] = dollarString[index].slice(2, dollarString[index].length - 1)

                                } else {

                                    // Fixing the other parts so they are a valid strings
                                    if (dollarString[index][0] != "'"){
                                        dollarString[index] = `'${dollarString[index]}`

                                    } 
                                    
                                    if (dollarString[index][dollarString[index].length - 1] != "'"){
                                        dollarString[index] = `${dollarString[index]}'`

                                    }
                                }
                            }

                            // Combining the sub strings and variables into one single string using the con function
                            currentArguments.push("con")
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

        if (tokenizedCode["main"] == undefined) throw new Error("Block Error: No main code block declared")
        if (tokenizedCode["main"].length == 0) throw new Error("Block Error: Main code block is empty")
            
        // Checks if the amount of arguments matches the defined amount of arguments a function should get
        this.argumentCountVerifier(tokenizedCode)

        return tokenizedCode
    }
}