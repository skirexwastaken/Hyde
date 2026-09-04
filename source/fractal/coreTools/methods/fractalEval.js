export const fractalEval = {
    fractalEval(operand) {
        let equation = operand.split(/(\+|\-|\*|\/)/)

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

        return Number(equation[0])
    }
}