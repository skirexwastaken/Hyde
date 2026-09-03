// Function that verifies the basic syntax integrity of the raw code
export const scanner = {
    scanner(rawCode){
        if (rawCode == "") throw new Error("Source Error: No code to be executed")

        let openingBracketCount = 0
        let closingBracketCount = 0
        let definingString = false
        let insideCodeBlock = false

        for (const byte of rawCode){
            // Checks that code blocks is not opened twice
            if (byte == "[" && definingString == false)
                if (insideCodeBlock == false) {
                    insideCodeBlock = true

                    continue

                } else {
                    throw new Error("Syntax Error: Code block definition: Invalid '['")
                    
                }
            
            // Checks that code block is not closed twice
            if (byte == "]" && definingString == false)
                if (insideCodeBlock == true) {
                    insideCodeBlock = false

                    continue

                } else {
                    throw new Error("Syntax Error: Code block definition: Invalid ']'")
                }
            
            // Checks that string is not defined outside of code block
            if (byte == "'")
                if (insideCodeBlock) {
                    if (definingString == false){
                        definingString = true 

                    } else {
                        definingString = false

                    }

                    continue

                } else {
                    throw new Error("Syntax Error: Code block definition: Invalid '''")
                }
            
            // This is a simple counter that counts the amount of '(' and ')'
            // It also makes sure that function argument definitions are not opened or closed outside of code block
            if (insideCodeBlock && ["(",")"].includes(byte)){
                if (definingString == false && byte == "("){
                    openingBracketCount++
                }

                if (definingString == false && byte == ")"){
                    closingBracketCount++
                }

                continue

            } else if (!insideCodeBlock && ["(",")"].includes(byte)){
                throw new Error(`Syntax Error: Code block definition: Invalid [${byte}]`)

            }
        }

        // The amount of "(" and ")" is compared to make sure all functions are valid
        if (openingBracketCount != closingBracketCount) throw new Error("Syntax Error: Function definition: The number of '(' doesn't match the number of ')' ")
    }
}   