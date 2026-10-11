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

export const processJsonWeb = {
    processJsonWeb(rawMarkdown) {
        rawMarkdown = rawMarkdown.replace(/<#==([\s\S]*?)===>/g, (match, content) => {
            // The JSON is stringified and turned into individual lines, which are then turned into paragraphs

            try {
                const contentJson = JSON.parse(content)

                const webContentArray = JSON.stringify(contentJson, null, 2).split('\n')

                // This array contains specific symbols whose colour is darker
                const structuralCharacters = ["\"",",","[","]","{","}"]

                // These two variables detect depth changes in the JSON
                let originalDepth = 0
                let currentDepth = 0

                // Adding the content to index.html

                const jsonContainer = []

                for (const line of webContentArray) {
                    // Counting depth
                    const trimmedLine = line.trim()
                    if (trimmedLine.endsWith("[") || trimmedLine.endsWith("{") || trimmedLine.startsWith("{")) currentDepth++
                    if (trimmedLine.startsWith("]") || trimmedLine.startsWith("}") || trimmedLine.endsWith("}")) currentDepth--

                    // Replacing spaces with non breaking spaces at the start of a string
                    let spaces = ""
                    for (const char of line.split("")){
                        if (char == ' '){
                            spaces += '&nbsp'
                        } else{
                            break
                        }
                    }

                    // Applying color to structural characters
                    let fullLine = `${spaces}${line.trim()}`
                    for (const symbol of structuralCharacters){
                        fullLine = fullLine.replaceAll(symbol, `<span class="structuralCharacter" >${symbol}</span>`)

                    }

                    // Making the new line element
                    const newLine = `<p>${fullLine}</p>`

                    jsonContainer.push(newLine)
                    
                    // Additional spacing is added to all lines on depth == 1 or on depth decrease
                    // Note: This is purely for styling purposes
                    if ((currentDepth == 1 && originalDepth == 1) || currentDepth < originalDepth){
                        jsonContainer.push("<br>")
                    }

                    originalDepth = currentDepth
                }
                
                return jsonContainer.join("\n")

            } catch (error) {
                console.log(error.stack)
                return match

            }
        })

        return rawMarkdown
    }
}