// Simple function that's able to evaluate basic mathematical operations inside of a string
// It only supports basic operations, that is + - / *
// It is to serve as an alternative to having to chain multiple function calls to create an equation
export const fractalEval = {
    fractalEval(operand) {

        // This regex splits the equation into tokens of numbers or operations
        let equation = operand.split(/(\+|\-|\*|\/)/)

        // To follow the order of operations, the * and / operands are resolved first
        for (let index = 1; index < equation.length - 1; index++){
            let equationModified = false

            if (equation[index] == "*"){
                equation[index] = Number(equation[index - 1]) * Number(equation[index + 1])

                equationModified = true

            } else if (equation[index] == "/") {
                equation[index] = Number(equation[index - 1]) / Number(equation[index + 1])

                equationModified = true
            }

            if (equationModified == true) {
                equation.splice(index - 1, 1)
                equation.splice(index, 1)

                index -= 2
            }
        }

        for (let index = 1; index < equation.length - 1; index++){
            let equationModified = false

            if (equation[index] == "+"){
                equation[index] = Number(equation[index - 1]) + Number(equation[index + 1])

                equationModified = true

            } else if (equation[index] == "-") {
                equation[index] = Number(equation[index - 1]) - Number(equation[index + 1])

                equationModified = true

            }

            if (equationModified == true) {
                equation.splice(index - 1, 1)
                equation.splice(index, 1)

                index -= 2

            }
        }

        // With how Fractal doesn't require specific data types for it's arguments, there is an possibility that something such as 'test + 10' could be the argument of this function
        // That would obviously result in the return value being NaN, which is not a data type Fractal supports as for right now
        // The compromise here is to return 0 for now
        return Number(equation[0]) == equation[0] ? equation[0] : 0
    }
}