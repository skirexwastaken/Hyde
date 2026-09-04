import {Fractal} from "../source/fractal/fractal.js"

// Function that creates an instance of Fractal
function runFractal(){
    try {
        const outputArguments = new Fractal("main[print()]", {})

    } catch (error){
        if (error.message != "") console.log(error.message)
    }
}

runFractal()