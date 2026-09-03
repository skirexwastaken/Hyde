import {Fractal} from "../source/fractal/fractal.js"

// Function that creates an instance of Fractal
function runFractal(){
    try {
        new Fractal("main[let('x',100), print(x)]")

    } catch (error){
        if (error.message != "") console.log(error.message)
    }
}

runFractal()