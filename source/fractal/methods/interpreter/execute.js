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
                    
                    case "clear":
                        this.coreTools.clearShell()

                        break

                    // Number functions

                    case "add": {
                        const operandAlpha = this.coreTools.isNumber(this.stack.pop())
                        const operandBeta = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(operandAlpha + operandBeta)

                        break
                    }

                    case "sub": {
                        const operandAlpha = this.coreTools.isNumber(this.stack.pop())
                        const operandBeta = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(operandAlpha - operandBeta)

                        break
                    }

                    case "mul": {
                        const operandAlpha = this.coreTools.isNumber(this.stack.pop())
                        const operandBeta = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(operandAlpha * operandBeta)

                        break
                    }

                    case "div": {
                        const operandAlpha = this.coreTools.isNumber(this.stack.pop())
                        const operandBeta = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(operandAlpha / operandBeta)

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
                        const operandAlpha = this.coreTools.isNumber(this.stack.pop())
                        const operandBeta = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(Math.pow(operandAlpha, operandBeta))

                        break
                    }

                    case "sqrt": {
                        const operand = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(Math.sqrt(operand))

                        break
                    }

                    case "abs": {
                        const operand = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(Math.abs(operand))

                        break
                    }

                    case "eval": {
                        const operand = String(this.stack.pop())

                        this.stack.push(this.coreTools.fractalEval(operand))
                        
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
                        const operand = this.stack.pop()

                        this.stack.push(Math.sin(operand))

                        break
                    }

                    case "cos": {
                        const operand = this.stack.pop()

                        this.stack.push(Math.cos(operand))

                        break
                    }

                    case "tan": {
                        const operand = this.stack.pop()

                        this.stack.push(Math.tan(operand))

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
                        const operandAlpha = this.coreTools.isNumber(this.stack.pop())
                        const operandBeta = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(operandAlpha == operandBeta ? 1 : 0)

                        break
                    }

                    case "gt": {
                        const operandAlpha = this.coreTools.isNumber(this.stack.pop())
                        const operandBeta = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(operandAlpha > operandBeta ? 1 : 0)

                        break
                    }

                    case "lt": {
                        const operandAlpha = this.coreTools.isNumber(this.stack.pop())
                        const operandBeta = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(operandAlpha < operandBeta ? 1 : 0)

                        break
                    }

                    case "and": {
                        const operandAlpha = this.coreTools.isNumber(this.stack.pop())
                        const operandBeta = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(operandAlpha > 0 && operandBeta > 0 ? 1 : 0)

                        break
                    }

                    case "or": {
                        const operandAlpha = this.coreTools.isNumber(this.stack.pop())
                        const operandBeta = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(operandAlpha > 0 || operandBeta > 0 ? 1 : 0)

                        break
                    }

                    case "not": {
                        const operand = this.coreTools.isNumber(this.stack.pop())

                        this.stack.push(operand > 0 ? 0 : 1)
                        
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
                        const operandAlpha = String(this.stack.pop())
                        const operandBeta = String(this.stack.pop())

                        this.stack.push(Number(operandAlpha.includes(operandBeta)))

                        break
                    }

                    case "remove": {
                        const operandAlpha = String(this.stack.pop())
                        const operandBeta = String(this.stack.pop())

                        this.stack.push(operandAlpha.replaceAll(operandBeta, ""))

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
                        const operandAlpha = String(this.stack.pop())
                        const operandBeta = String(this.stack.pop())

                        this.stack.push(operandAlpha.startsWith(operandBeta) ? 1 : 0)

                        break
                    }

                    case "endsWith": {
                        const operandAlpha = String(this.stack.pop())
                        const operandBeta = String(this.stack.pop())

                        this.stack.push(operandAlpha.endsWith(operandBeta) ? 1 : 0)

                        break
                    }

                    case "len": {
                        const operand = String(this.stack.pop())

                        this.stack.push(operand.length)

                        break
                    }

                    case "upper": {
                        const operand = String(this.stack.pop())

                        this.stack.push(operand.toUpperCase())

                        break
                    }

                    case "lower": {
                        const operand = String(this.stack.pop())

                        this.stack.push(operand.toLowerCase())

                        break 
                    }

                    case "capital": {
                        const operand = String(this.stack.pop())

                        this.stack.push(`${operand[0].toUpperCase()}${operand.slice(1)}`)

                        break
                    }

                    case "unCapital": {
                        const operand = String(this.stack.pop())

                        this.stack.push(`${operand[0].toLowerCase()}${operand.slice(1)}`)

                        break
                    }

                    case "charAt": {
                        const operand = this.stack.pop()
                        let index = this.coreTools.isNumber(this.stack.pop())

                        // For example charAt('word', -1) -1 + 4 = 3 -> d
                        if (index < 0) {
                            index += operand.length
                        }

                        if (index < operand.length && index >= 0){
                            this.stack.push(operand[index])

                        } else {
                            this.stack.push("")

                        }
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
                        const date = new Date()

                        this.stack.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)

                        break
                    }

                    case "getYear": {
                        const date = new Date()

                        this.stack.push(date.getFullYear())

                        break
                    }

                    case "getMonth": {
                        const date = new Date()

                        this.stack.push(date.getMonth())

                        break
                    }

                    case "getDay": {
                        const date = new Date()

                        this.stack.push(date.getDate())

                        break
                    }

                    case "getHour": {
                        const date = new Date()

                        this.stack.push(date.getHours())

                        break
                    }

                    case "getMinute": {
                        const date = new Date()

                        this.stack.push(date.getMinutes())

                        break
                    }

                    case "getSecond": {
                        const date = new Date()

                        this.stack.push(date.getSeconds())

                        break
                    }
                        
                    // Control flow

                    case "exec":{
                        const codeBlock = this.codeBlockMap[this.stack.pop()]

                        this.executionStack.push([codeBlock,0])

                        return codeBlock

                        break
                    }

                    case "if":{
                        const codeBlockIf = this.codeBlockMap[this.stack.pop()]
                        const codeBlockElse = this.codeBlockMap[this.stack.pop()]
                        const operand = this.coreTools.isNumber(this.stack.pop())

                        if (operand > 0) {
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