import {Fractal} from "../source/fractal/fractal.js"

// Function that creates an instance of Fractal
function runFractal(){
    try {
        const outputArguments = new Fractal("main[print(x),let(x, 200) print(x)]", {"x":100})

    } catch (error){
        if (error.message != "") console.log(error.message)
    }
}

runFractal()