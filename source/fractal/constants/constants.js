// Debug messages showing the state of the code at each step
export const DEBUG = false

// Dictionary of functions and their amount of arguments where null means any
// Note: The interpreter recognizes additional functions that help with execution
export const FUNCTIONS = {
    // IO
    "print": null,
    "log": null,

    "clear": 0,

    // Number functions
    "add": 2,
    "/+": 2,

    "sub": 2,
    "/-": 2,

    "mul": 2,
    "/*": 2,

    "div": 2,
    "//": 2,

    "eq": 2,
    "==": 2,

    "gt": 2,
    ">": 2,

    "lt": 2,
    "<": 2,

    "and": 2,
    "&": 2,

    "or": 2,
    "|": 2,

    "not": 1,
    "!": 1,

    "inc": 1,
    "++": 1,

    "dec": 1,
    "--": 1,

    "pow": 2,
    "**": 2,

    "sqrt": 1,

    "abs": 1,


    // Boolean

    "true": 0,

    "false": 0,

    "none": 0,

    // String functions

    "con": null,

    // Data types
    "parseStr": 1,
    "parseNum": 1,

    "isStr": 1,
    "isNum": 1,

    "reverse": 1,

    "contains":2,

    "remove": 2,

    // Control flow
    "exec": 1,

    "if": 3,

    "lambda": null,

    "sleep": 1,

    // Variables
    "let": 2,
    ":=": 2,

    // Exit
    "exit": 1
}

// Functions that can have variable amount of arguments
export let NFUNCTIONS = []
for (const functionName in FUNCTIONS){
    if (FUNCTIONS[functionName] == null) NFUNCTIONS.push(functionName)
}

// Functions that control the flow of code
export const CFUNCTIONS = ["if"]