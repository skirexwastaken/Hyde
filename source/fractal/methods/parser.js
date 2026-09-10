import {FUNCTIONS, NFUNCTIONS} from "../constants/constants.js"

// Parser generates an array of function calls in a dictionary format
export const parser =  {
    parser(tokenizedCode){

        // codeBlockName : arrayOfFunctionCalls
        const instructionSets = {}

        // All variable names are replaced with indexes to their memory location
        let variableCounter = this.loadInputArguments()

        // Going thru every code block
        for (const codeBlockName in tokenizedCode){
            const codeBlock = tokenizedCode[codeBlockName]

            // The whole parsing logic is based on two concepts
                // Polish Notation -> function before arguments, for example print "Hello World"
                // Reverse Polish Notation -> function after arguments, for example "Hello World" print
            // Reverse polish notation works well with stack based VMs which is what Fractal uses to interpret the bytecode Parser generates

            // reversedPolishNotationCode = entire code block
            let reversedPolishNotationCode = []
            for (let lineIndex = 0; lineIndex < codeBlock.length; lineIndex += 2){

                // Grabbing the function and arguments and flattening the arguments
                // For example [print] [merge ["Hello ", "World", "!"]] -> [print] [merge, "Hello ", "World", "!"]
                const func = [codeBlock[lineIndex]]
                const arg = codeBlock[lineIndex + 1].flat(Infinity)

                // Merging the function and arguments into one array
                // For example [print] [merge, "Hello ", "World", "!"] -> [print, merge, "Hello ", "World", "!"]
                const polishNotationLine = func.concat(arg)

                // Turning Polish Notation line into Reverse Polish Notation line
                // For example [print, merge, "Hello ", "World", "!"] -> ["!", "World", "Hello ", merge, print]
                let reversedPolishNotationLine = polishNotationLine.reverse()

                // Since standard stack works on the Last In First Out principle, the arguments in the previous example will be assembled in the correct order and merged into "Hello World!" and then printed

                // After generating the Reverse Polish Notation Line, individual keywords are translated to direct function calls
                for (let keywordIndex = 0; keywordIndex < reversedPolishNotationLine.length; keywordIndex++){
                    let keyword = reversedPolishNotationLine[keywordIndex]

                    // Function
                    if (keyword in FUNCTIONS){
                        reversedPolishNotationLine[keywordIndex] = {"function":keyword}
                        
                        // Functions that require specific data type as argument

                        // Let expects the variable name to be a string
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
                            if(!(reversedPolishNotationLine[keywordIndex - 1]["value"] in this.MemoryManager.memoryMap)) this.MemoryManager.memoryMap[reversedPolishNotationLine[keywordIndex - 1]["value"]] = variableCounter++

                            reversedPolishNotationLine[keywordIndex - 1]["function"] = "number"
                            reversedPolishNotationLine[keywordIndex - 1]["value"] = this.MemoryManager.memoryMap[reversedPolishNotationLine[keywordIndex - 1]["value"]]   
                        
                        // Exec expects a string that refers to a valid codename
                        } else if (["exec","if"].includes(keyword)){
                            if (reversedPolishNotationLine[keywordIndex - 1]["function"] != "string"){
                                throw new Error (`Syntax Error: ${keyword.charAt(0).toUpperCase()}${keyword.slice(1)} function expects a string [${reversedPolishNotationLine[keywordIndex - 1]["value"]}] `)

                            } else if (!(reversedPolishNotationLine[keywordIndex - 1]["value"] in tokenizedCode)) {
                                throw new Error (`Syntax Error: Invalid code block named [${reversedPolishNotationLine[keywordIndex - 1]["value"]}] has been passed to ${keyword} function`)

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
                        // For example print3 expects 3 arguments
                        for (const functionName of NFUNCTIONS){
                            if (!isNaN(keyword.replace(functionName,""))){
                                reversedPolishNotationLine[keywordIndex] = {"function":functionName,"arguments":Number(keyword.replace(functionName,""))}
                                break

                            }
                        }

                        // Checking if this specific keyword was a function with a variable amount of arguments
                        if (reversedPolishNotationLine[keywordIndex] instanceof Object) {
                            continue

                        }

                        // Variable path

                        // Variable can't start with a number
                        if (!isNaN(keyword[0])) {
                            throw new Error(`Syntax Error: Variable [${keyword}] starts with a number`)

                        }
                        
                        // In case that the next keyword is let, the variable name is treated as a string
                        // So both of the following examples are legal ways to set a value of a variable
                            // let('x', 10)
                            // let(x, 10)
                        if (["let",":="].includes(reversedPolishNotationLine[keywordIndex + 1])){
                            reversedPolishNotationLine[keywordIndex] = {"function":"string", "value":keyword}
                        
                        // Proper variable
                        } else {

                            // Variable needs to be declared before being used
                            if (!(keyword in this.MemoryManager.memoryMap)) {
                                throw new Error(`Syntax Error: Variable [${keyword}] is undeclared`)

                            }

                            reversedPolishNotationLine[keywordIndex] = {"function":"variable", "value":this.MemoryManager.memoryMap[keyword]}
                        }
                    }
                }

                // All instructions from single line are added to the code block
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

            instructionSets[codeBlockName] = reversedPolishNotationCode
        }

        // Meta data holds additional information for the interpreter
        const metaData = {
            "variableCount":variableCounter
        }

        return [instructionSets, metaData]
    }
}