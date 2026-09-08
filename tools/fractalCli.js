import {Fractal} from "../source/fractal/fractal.js"

try {
    const [outputArguments, shellOutputBuffer] = new Fractal("main [print('Hey, ${name}!')]", {"name": "Daniel"})

    console.log(JSON.stringify(outputArguments), shellOutputBuffer)

} catch (error) {
    if (error.message != "") {
        console.log(error.message)

    }  
}