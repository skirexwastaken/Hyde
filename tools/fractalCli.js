import {Fractal} from "../source/fractal/fractal.js"

try {
    const outputArguments = new Fractal("main[print()]", {})

} catch (error){
    if (error.message != "") console.log(error.message)
}