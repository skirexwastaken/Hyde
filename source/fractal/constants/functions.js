// Dictionary of functions and their amount of arguments where null means any amount of arguments
export const FUNCTIONS = {
    // IO
    "print": null,

    "clear": 0,

    // Number functions
    "add": 2,

    "sub": 2,

    "mul": 2,

    "div": 2,

    "inc": 1,

    "dec": 1,

    "pow": 2,

    "sqrt": 1,

    "abs": 1,

    "eval": 1,

    "min": null,

    "max": null,

    "sum": null,

    "average": null,

    "sin": 1,

    "cos": 1,
    
    "tan": 1,

    // Boolean

    "true": 0,

    "false": 0,

    "none": 0,

    "eq": 2,

    "gt": 2,

    "lt": 2,

    "and": 2,

    "or": 2,

    "not": 1,

    // String functions

    "merge": null,

    "reverse": 1,

    "contains": 2,

    "remove": 2,

    "any": null,

    "startsWith": 2,
    "endsWith": 2,

    "len": 1,

    "upper": 1,
    "lower": 1,

    "capital": 1,
    "unCapital": 1,

    "charAt": 2,

    // Data types
    "parseStr": 1,
    "parseNum": 1,

    "isStr": 1,
    "isNum": 1,

    // Date module

    "datetime": 0,
    
    "getYear": 0,
    "getMonth": 0,
    "getDay": 0,
    "getHour": 0,
    "getMinute": 0,
    "getSecond": 0,

    // Control flow
    "exec": 1,

    "if": 3,

    // Variables
    "let": 2,

    // Exit
    "exit": 1
}

// Functions that can have variable amount of arguments, it is used in various parts of the code as an easy way to get all of those functions
export let NFUNCTIONS = []
for (const functionName in FUNCTIONS){
    if (FUNCTIONS[functionName] == null) NFUNCTIONS.push(functionName)
}

// Functions that control the flow of code, those functions require having code block names as some of their arguments
export const CFUNCTIONS = ["if"]