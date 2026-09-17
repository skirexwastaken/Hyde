import {Fractal} from "../../../../fractal/fractal.js"

export const compileFractalCode = {
    compileFractalCode(fractalCode, route) {
        let compiledBytecode = []
        for (const line of fractalCode) {
            const [bytecode, inputArguments] = line

            const fractalInstance = new Fractal(inputArguments)
            
            try {
                compiledBytecode.push([fractalInstance.compile(bytecode), inputArguments])

            } catch (error) {
                compiledBytecode.push([fractalInstance.compile("main [print()]"), inputArguments])

                console.log(`[Fractal] ${error.message} in file ${route.replace(".md","")}.fs`)
            }
        }

        return compiledBytecode

    }
}