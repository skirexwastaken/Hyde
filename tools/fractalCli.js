import {Fractal} from "../source/fractal/fractal.js"

// This is an example of how Fractal works

// The whole execution loop is in try and catch where the errors are all custom written errors
try {

    // First you need to create an instance of fractal with Input Arguments, which can be an empty object
    const fractalInstance = new Fractal({"name": "Daniel"})

    // Before executing the code you need to compile it into Fractal bytecode, you will also get meta data object
    const [instructionSets, metaData] = fractalInstance.compile("main [print('Hey, ${name}!')]")

    // Compiled code can be executed using the interpreter functions, it returns
        // Output Arguments, which are values of input arguments at the end of code execution
        // Shell Output Buffer which contains all of the strings returned by the print function
    const [outputArguments, shellOutputBuffer] =  fractalInstance.interpreter(instructionSets, metaData)

    console.log(JSON.stringify(outputArguments), shellOutputBuffer)

} catch (error) {
        console.log(error.message)

}