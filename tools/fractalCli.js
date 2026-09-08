import {Fractal} from "../source/fractal/fractal.js"

try {
    const fractalInstance = new Fractal({"name": "Daniel"})

    const [instructionSets, metaData] = fractalInstance.compile("main [print('Hey, ${name}!')]")

    const [outputArguments, shellOutputBuffer] =  fractalInstance.interpreter(instructionSets, metaData)

    console.log(JSON.stringify(outputArguments), shellOutputBuffer)

} catch (error) {
    if (error.message != "") {
        console.log(error.message, error.stack)

    }  
}