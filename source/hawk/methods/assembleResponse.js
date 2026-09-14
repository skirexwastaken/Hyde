import {Fractal} from "../../fractal/fractal.js"

export const assembleResponse = {
    assembleResponse(htmlFile, fractalBytecode) {
        let fractalBytecodeIndex = 0
        let allOutputArguments = {}

        // Going thru every line of the HTML file and looking for the code block place holders
        for (let htmlLineIndex = 0; htmlLineIndex < htmlFile.length; htmlLineIndex ++) {
            htmlFile[htmlLineIndex] = htmlFile[htmlLineIndex].replace(/<!==#===>/, (match) => {

                // The code bellow is how you run an instance of Fractal

                // First the script gets the compiled bytecode together with input arguments
                const [bytecode, inputArguments] = fractalBytecode[fractalBytecodeIndex++]

                // Bytecode is splits into instruction sets and metaData about those instruction sets
                const [instructionSets, metaData] = bytecode

                // Then a new Fractal instance is created
                const fractalInstance = new Fractal(inputArguments)

                // And finally the instructions sets and meta data can be put to Fractal interpreter which returns output arguments and buffer of all print outputs
                const [outputArguments, shellOutputBuffer] =  fractalInstance.interpreter(instructionSets, metaData)

                // Output arguments are added to all output arguments
                // Variables embded in text are turned into scopes during Markdown -> HTML translation process
                // Each code block inside of the Markdown file only has access to the variables above it
                for (const outputArgument in outputArguments) {
                    allOutputArguments[outputArgument] = outputArguments[outputArgument]

                }

                // Shell output buffer is turned into proper HTML lines
                let htmlLines = ""
                for (const line of shellOutputBuffer) {
                    htmlLines += `<p>${line}</p>`

                }
        
                return htmlLines
            })
        }

        console.log("[Fractal] Executed fractal code")

        // All variables embeded in text are replaced with their values from output arguments
        for (let htmlLineIndex = 0; htmlLineIndex < htmlFile.length; htmlLineIndex ++) {
            htmlFile[htmlLineIndex] = htmlFile[htmlLineIndex].replace(/\$\{(\S*?)\}/g, (match, variableName) => {
                return allOutputArguments[variableName]
                
            })
        }

        console.log("[Hawk] Html file assembled")

        // Returning the modified HTML file merged back together into a string
        return htmlFile.join("\n")
    }
}