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

                    if (codeBlockName == "") codeBlockName = "main"

                    tokenizedCode[codeBlockName] = []
                    definingCodeBlock = false


                } else {
                    if (!([" ",","].includes(byte))) codeBlockName += byte
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

                    keyword = keyword.trim()

                    if (keyword != "") currentArguments.push(keyword)

                    if ((!(keyword in FUNCTIONS) && byte == "(") || keyword in FUNCTIONS && byte != "(") throw new Error(`Syntax Error: Function [${keyword}] is an invalid function`)

                    let instanceCounter = 0

                    for (const func in FUNCTIONS){
                        if (keyword.includes(func)) instanceCounter++
                    }
                    
                    for (const func in FUNCTIONS){
                        if ((keyword).includes(func) && keyword != func && keyword[0] != "'" && instanceCounter == 1) throw new Error(`Syntax Error: Function [${keyword}] is an invalid function`)
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