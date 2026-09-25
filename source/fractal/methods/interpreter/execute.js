// The execution function itself that executes individual Fractal functions
export const execute = {
    // Function that runs individual instructions
    execute(fragments){
        switch(fragments[0]) {
            // Data type where the value is a function name
            case "function": {
                switch(fragments[1]){

                    // Function that user can write

                    // IO

                    case "print": {
                        const argumentAmount = this.stack.pop()

                        let printLine = ""
                        for (let index = 0; index < argumentAmount; index++){
                            printLine += `${this.stack.pop()} `
                        }

                        printLine = printLine.trim()
                        this.coreTools.shellOutput(printLine)

                        this.stack.push(printLine)

                        break

                    }
                    
                    case "clear":{
                        this.coreTools.clearShell()

                        break
                    
                    }

                    // Number functions

                    case "add": {
                        const firstNumber = this.coreTools.isNumber(this.stack.pop())
                        const secondNumber = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(firstNumber + secondNumber)

                        break

                    }

                    case "sub": {
                        const firstNumber = this.coreTools.isNumber(this.stack.pop())
                        const secondNumber = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(firstNumber - secondNumber)

                        break

                    }

                    case "mul": {
                        const firstNumber = this.coreTools.isNumber(this.stack.pop())
                        const secondNumber = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(firstNumber * secondNumber)

                        break

                    }

                    case "div": {
                        const firstNumber = this.coreTools.isNumber(this.stack.pop())
                        const secondNumber = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(firstNumber / secondNumber)

                        break

                    }

                    case "inc": {
                        this.stack.push(this.coreTools.isNumber(this.stack.pop()) + 1)

                        break

                    }

                    case "dec": {
                        this.stack.push(this.coreTools.isNumber(this.stack.pop()) - 1)

                        break

                    }
                    
                    case "pow": {
                        const base = this.coreTools.isNumber(this.stack.pop())
                        const coefficient = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(Math.pow(base, coefficient))

                        break

                    }

                    case "sqrt": {
                        const number = this.coreTools.isNumber(this.stack.pop())

                        if (number >= 0) {
                            this.stack.push(Math.sqrt(number))

                        } else {
                            this.stack.push(0)

                        }

                        break

                    }

                    case "abs": {
                        const number = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(Math.abs(number))

                        break

                    }

                    case "eval": {
                        const equation = String(this.stack.pop())

                        this.stack.push(this.coreTools.fractalEval(equation))
                        
                        break

                    }

                    case "min": {
                        const argumentAmount = this.stack.pop()

                        let values = []
                        for (let index = 0; index < argumentAmount; index++) {
                            values.push(this.coreTools.isNumber(this.stack.pop()))

                        }

                        this.stack.push(Math.min.apply(null, values))

                        break

                    }

                    case "max": {
                        const argumentAmount = this.stack.pop()

                        let values = []
                        for (let index = 0; index < argumentAmount; index++) {
                            values.push(this.coreTools.isNumber(this.stack.pop()))

                        }

                        this.stack.push(Math.max.apply(null, values))

                        break

                    }

                    case "sum": {
                        const argumentAmount = this.stack.pop()

                        let totalValue = 0
                        for (let index = 0; index < argumentAmount; index++) {
                            totalValue += this.coreTools.isNumber(this.stack.pop())

                        }

                        this.stack.push(totalValue)

                        break

                    }

                    case "average": {
                        const argumentAmount = this.stack.pop()
                        
                        let totalValue = 0
                        for (let index = 0; index < argumentAmount; index++) {
                            totalValue += this.coreTools.isNumber(this.stack.pop())

                        }

                        this.stack.push(totalValue / argumentAmount)

                        break

                    }

                    case "sin": {
                        const number = this.stack.pop()

                        this.stack.push(Math.sin(number))

                        break

                    }

                    case "cos": {
                        const number = this.stack.pop()

                        this.stack.push(Math.cos(number))

                        break

                    }

                    case "tan": {
                        const number = this.stack.pop()

                        this.stack.push(Math.tan(number))

                        break

                    }

                    case "random": {
                        this.stack.push(Math.random)

                        break

                    }

                    case "true": {
                        this.stack.push(1)

                        break

                    }

                    case "false": {
                        this.stack.push(0)

                        break

                    }

                    case "none": {
                        this.stack.push("")

                        break

                    }

                    case "eq": {
                        const firstNumber = this.coreTools.isNumber(this.stack.pop())
                        const secondNumber = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(firstNumber == secondNumber ? 1 : 0)

                        break

                    }

                    case "gt": {
                        const firstNumber = this.coreTools.isNumber(this.stack.pop())
                        const secondNumber = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(firstNumber > secondNumber ? 1 : 0)

                        break

                    }

                    case "lt": {
                        const firstNumber = this.coreTools.isNumber(this.stack.pop())
                        const secondNumber = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(firstNumber < secondNumber ? 1 : 0)

                        break

                    }

                    case "and": {
                        const firstNumber = this.coreTools.isNumber(this.stack.pop())
                        const secondNumber = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(firstNumber > 0 && secondNumber > 0 ? 1 : 0)

                        break
                    }

                    case "or": {
                        const firstNumber = this.coreTools.isNumber(this.stack.pop())
                        const secondNumber = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(firstNumber > 0 || secondNumber > 0 ? 1 : 0)

                        break

                    }

                    case "not": {
                        const number = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(number > 0 ? 0 : 1)
                        
                        break

                    }

                    // String functions

                    case "merge": {
                        const argumentAmount = this.stack.pop()
                        
                        let connectedLine = ""
                        for (let index = 0; index < argumentAmount; index++){
                            connectedLine += String(this.stack.pop())

                        }

                        connectedLine = connectedLine.trim()

                        this.stack.push(connectedLine)

                        break

                    }

                    case "reverse": {
                        this.stack.push(
                            String(
                                this.stack.pop()
                            ).split("").reverse().join("")
                        )

                        break

                    }

                    case "contains": {
                        const string = String(this.stack.pop())
                        const argument = String(this.stack.pop())

                        this.stack.push(Number(string.includes(argument)))

                        break

                    }

                    case "remove": {
                        const string = String(this.stack.pop())
                        const argument = String(this.stack.pop())

                        this.stack.push(string.replaceAll(argument, ""))

                        break

                    }

                    case "any": {
                        const argumentAmount = this.stack.pop()

                        let operands = []
                        for (let index = 0; index < argumentAmount; index++) {
                            operands.push(this.stack.pop())

                        }

                        const randomOperand =  operands[Math.floor(Math.random() * operands.length)]

                        this.stack.push(randomOperand)

                        break

                    }

                    case "startsWith": {
                        const string = String(this.stack.pop())
                        const argument = String(this.stack.pop())

                        this.stack.push(string.startsWith(argument) ? 1 : 0)

                        break

                    }

                    case "endsWith": {
                        const string = String(this.stack.pop())
                        const argument = String(this.stack.pop())

                        this.stack.push(string.endsWith(argument) ? 1 : 0)

                        break

                    }

                    case "len": {
                        const string = String(this.stack.pop())

                        this.stack.push(string.length)

                        break

                    }

                    case "upper": {
                        const string = String(this.stack.pop())

                        this.stack.push(string.toUpperCase())

                        break

                    }

                    case "lower": {
                        const string = String(this.stack.pop())

                        this.stack.push(string.toLowerCase())

                        break 

                    }

                    case "capital": {
                        const string = String(this.stack.pop())

                        this.stack.push(`${string[0].toUpperCase()}${string.slice(1)}`)

                        break

                    }

                    case "unCapital": {
                        const string = String(this.stack.pop())

                        this.stack.push(`${string[0].toLowerCase()}${string.slice(1)}`)

                        break

                    }

                    case "charAt": {
                        const string = this.stack.pop()
                        let index = this.coreTools.isNumber(this.stack.pop())

                        // For example charAt('word', -1) -1 + 4 = 3 -> d
                        if (index < 0) {
                            index += string.length
                        }

                        if (index < string.length && index >= 0){
                            this.stack.push(string[index])

                        } else {
                            this.stack.push("")

                        }

                        break

                    }

                    case "extendEnd": {
                        const string = this.stack.pop()
                        const argument = this.stack.pop()

                        this.stack.push(`${string}${argument}`)

                        break

                    }

                    case "dropEnd": {
                        const string = this.stack.pop()

                        this.stack.push(string.slice(0, -1))

                        break

                    }

                    case "extendStart": {
                        const string = this.stack.pop()
                        const argument = this.stack.pop()

                        this.stack.push(`${argument}${string}`)

                        break

                    }

                    case "dropStart": {
                        const string = this.stack.pop()

                        this.stack.push(string.slice(1))

                        break

                    }

                    // Data type functions

                    case "parseStr": {
                        this.stack.push(String(this.stack.pop()))

                        break

                    }

                    case "parseNum": {
                        this.stack.push(this.coreTools.isNumber(this.stack.pop()))

                        break

                    }

                    case "isStr": {
                        this.stack.push(isNaN(this.stack.pop()) ? 1 : 0)

                        break

                    }

                    case "isNum": {
                        this.stack.push(isNaN(this.stack.pop()) ? 0 : 1)

                        break

                    }
                    
                    // Date module

                    case "datetime": {
                        const currentDate = new Date()

                        this.stack.push(`${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}`)

                        break

                    }

                    case "getYear": {
                        const currentDate = new Date()

                        this.stack.push(currentDate.getFullYear())

                        break

                    }

                    case "getMonth": {
                        const dacurrentDatete = new Date()

                        this.stack.push(currentDate.getMonth() + 1)

                        break

                    }

                    case "getDay": {
                        const currentDate = new Date()

                        this.stack.push(currentDate.getDate())

                        break

                    }

                    case "getHour": {
                        const currentDate = new Date()

                        this.stack.push(currentDate.getHours())

                        break

                    }

                    case "getMinute": {
                        const currentDate = new Date()

                        this.stack.push(currentDate.getMinutes())

                        break

                    }

                    case "getSecond": {
                        const currentDate = new Date()

                        this.stack.push(currentDate.getSeconds())

                        break

                    }
                        
                    // Control flow

                    case "exec":{
                        const codeBlock = this.codeBlockMap[this.stack.pop()]

                        this.executionStack.push([codeBlock,0])

                        return codeBlock

                    }

                    case "if":{
                        const codeBlockIf = this.codeBlockMap[this.stack.pop()]
                        const codeBlockElse = this.codeBlockMap[this.stack.pop()]
                        const condition = this.coreTools.isNumber(this.stack.pop())

                        if (condition > 0) {
                            this.executionStack.push([codeBlockIf,0])

                        } else {
                            this.executionStack.push([codeBlockElse,0])

                        }

                        break

                    }

                    // Variables

                    case "let": {
                        const index = this.stack.pop()
                        const value = this.stack.pop()

                        this.MemoryManager.setVariableValue(index, value)

                        this.stack.push(value)

                        break

                    }

                    // Exit

                    case "exit": {
                        let exitLine = String(this.stack.pop())
                        
                        exitLine = exitLine.trim()
                        this.coreTools.shellOutput(exitLine)

                        while (this.executionStack.length != 0) {
                            this.executionStack.pop()

                        }

                        break

                    }

                    // Functions that the user can't write

                    // Special functions that are automatically added to the code by parser

                    case "pop": {
                        this.stack.pop()

                        break

                    }

                    case "end": {
                        this.executionStack.pop()

                        break

                    }
                }

                break

            }

            // Data types that return direct values

            case "string": {
                this.stack.push(fragments[1])

                break
                
            }

            case "number": {
                this.stack.push(fragments[1])

                break

            }

            case "variable": {
                const index = fragments[1]

                this.stack.push(this.MemoryManager.getVariableValue(index))

                break

            }
        }
    }
}