import {Fractal} from "../source/fractal/fractal.js"

try {
    const outputArguments = new Fractal("main [print('Hey, ${name}!')]", {"name": "Daniel"})

    console.log(JSON.stringify(outputArguments))

} catch (error) {
    if (error.message != "") {
        console.log(error.message)

    }  
}