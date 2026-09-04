import {FUNCTIONS, NFUNCTIONS} from "../constants/constants.js"

export const parser =  {
    // This function converts tokenized code into direct function calls
    parser(tokenizedCode){
        let variableMap = {}
        let variableCounter = 0

        // Going thru every code block
        for (const codeBlockName in tokenizedCode){
            const codeBlock = tokenizedCode[codeBlockName]

            // Going thru every line
            let reversedPolishNotationCode = []
            for (let lineIndex = 0; lineIndex < codeBlock.length; lineIndex += 2){
                const func = [codeBlock[lineIndex]]
                const arg = codeBlock[lineIndex + 1].flat(Infinity)

                // Polish notation follows this format function argument1 argument2 ... argumentX
                const polishNotationLine = func.concat(arg)

                // Reverse polish notation follows this format argumentX .. argument2 argument 1 function
                // This format is ideal for a stack based virtual machine
                // For example: 'Hello World' print1 -> Instruction 'Hello World' adds the string to a stack and then print takes it from the stack using the LIFO system
                let reversedPolishNotationLine = polishNotationLine.reverse()

                // Going thru every keyword on a line
                for (let keywordIndex = 0; keywordIndex < reversedPolishNotationLine.length; keywordIndex++){
                    let keyword = reversedPolishNotationLine[keywordIndex]

                    // Function
                    if (keyword in FUNCTIONS){
                        reversedPolishNotationLine[keywordIndex] = {"function":keyword}
                        
                        // Functions that require specific data type as argument
                        if (["let",":="].includes(keyword)){

                            // In written code, the variable value must be a string
                            if (reversedPolishNotationLine[keywordIndex - 1]["function"] != "string"){
                                throw new Error (`Syntax Error: Variable [${reversedPolishNotationLine[keywordIndex - 1]["value"]}] has an identifier that is not a string`)

                            } else {
                                const stringName = reversedPolishNotationLine[keywordIndex - 1]["value"]

                                for (const func in FUNCTIONS){
                                    if (stringName.includes(func)) throw new Error(`Syntax Error: Variable [${stringName}] contains a function name`)
                                }
                            }
                            
                            // In order for efficient variable lookup during execution, all variable names are replaced with indexes to memory array
                            if(!(reversedPolishNotationLine[keywordIndex - 1]["value"] in variableMap)) variableMap[reversedPolishNotationLine[keywordIndex - 1]["value"]] = variableCounter++

                            reversedPolishNotationLine[keywordIndex - 1]["function"] = "number"
                            reversedPolishNotationLine[keywordIndex - 1]["value"] = variableMap[reversedPolishNotationLine[keywordIndex - 1]["value"]]   

                        } else if (keyword == "exec"){
                            if (reversedPolishNotationLine[keywordIndex - 1]["function"] != "string"){
                                throw new Error (`Syntax Error: Execution function expects a string [${reversedPolishNotationLine[keywordIndex - 1]["value"]}] `)

                            } else if (!(reversedPolishNotationLine[keywordIndex - 1]["value"] in tokenizedCode)) {
                                throw new Error (`Syntax Error: Invalid code block named [${reversedPolishNotationLine[keywordIndex - 1]["value"]}] has been passed to execution function`)

                            }

                        } else if (keyword == "if"){
                            if (reversedPolishNotationLine[keywordIndex - 1]["function"] != "string" || reversedPolishNotationLine[keywordIndex - 2]["function"] != "string"){
                                throw new Error (`Syntax Error: If function expects a string [${reversedPolishNotationLine[keywordIndex - 1]["value"]}] `)

                            } else if (!(reversedPolishNotationLine[keywordIndex - 1]["value"] in tokenizedCode) || !(reversedPolishNotationLine[keywordIndex - 2]["value"]) in tokenizedCode){
                                throw new Error (`Syntax Error: Invalid code block named [${reversedPolishNotationLine[keywordIndex - 1]["value"]}] has been passed to if function`)

                            }
                        }

                    // Number
                    } else if (!isNaN(keyword) && keyword != ""){
                        reversedPolishNotationLine[keywordIndex] = {"function":"number","value":keyword}
                    
                    // String
                    } else if (keyword[0] == "'" || keyword == ""){
                        reversedPolishNotationLine[keywordIndex] = {"function":"string","value":keyword.slice(1, -1)}

                    // Variable / Function with a variable amount of arguments
                    } else {

                        // Specific case for functions with variable amount of arguments which is stored after the functionName itself
                        for (const functionName of NFUNCTIONS){
                            if (!isNaN(keyword.replace(functionName,""))){
                                reversedPolishNotationLine[keywordIndex] = {"function":functionName,"arguments":Number(keyword.replace(functionName,""))}
                                break
                            }
                        }

                        if (reversedPolishNotationLine[keywordIndex] instanceof Object) continue

                        // Variable path

                        // Variable can't start with a number
                        if (!isNaN(keyword[0])) throw new Error(`Syntax Error: Variable [${keyword}] starts with a number`)
                        
                        // In case that the next keyword is let, the variable name is treated as a string
                        if (["let",":="].includes(reversedPolishNotationLine[keywordIndex + 1])){
                            reversedPolishNotationLine[keywordIndex] = {"function":"string", "value":keyword}
                        
                        // Proper variable
                        } else {

                            // Variable needs to be declared before being used
                            if (!(keyword in variableMap)) throw new Error(`Syntax Error: Variable [${keyword}] is undeclared`)

                            for (const func in FUNCTIONS){
                                if (keyword.includes(func)) throw new Error(`Syntax Error: Variable [${keyword}] contains a function name`)
                            }

                            reversedPolishNotationLine[keywordIndex] = {"function":"variable", "value":variableMap[keyword]}
                        }
                    }
                }

                // All instructions are added to a single line
                for (const instruction of reversedPolishNotationLine){
                    reversedPolishNotationCode.push(instruction)
                }

                // Since every function returns a value, it is important to clear the return value of a function with depth of 0 in order to prevent stack memory leak
                reversedPolishNotationCode.push({"function":"pop"})
            }

            // The last pop instruction of all other codeblocks is removed to allow the function to pass an argument back
            // For example if I call a function example inside of main inside of print function, it will print the return value of the example function
            if (codeBlockName != "main") reversedPolishNotationCode.pop()

            // End determines where the code block ends
            // The benefit of this is that the interpreter doesn't have to compare the instruction index against the code block length each time
            reversedPolishNotationCode.push({"function":"end"})

            this.instructionSets[codeBlockName] = reversedPolishNotationCode
        }

        // Meta data holds additional information for the interpreter
        this.metaData = {
            "variableCount":variableCounter
        }
    }
}