/*
GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) 2026 Daniel Hora

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

import {} from "../../startupScripts/consoleDebug.js"

import {parentPort, workerData} from 'worker_threads'

import {Fractal} from "../../fractal/fractal.js"

function assembleResponse(htmlFile, fractalBytecode) {
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
            const fractalInstance = new Fractal({"compiler": false, "interpreter": true}, inputArguments)

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

parentPort.on('message', (data) => {
    const {htmlFile, fractalBytecode} = data

    const htmlResponse = assembleResponse(htmlFile.split("\n"), fractalBytecode)

    parentPort.postMessage(htmlResponse)
})