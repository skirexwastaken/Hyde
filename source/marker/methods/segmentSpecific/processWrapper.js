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

export const processWrapper = {
    // This function focuses on procesing wrapper syntax, such as **Example of text**
    processWrapper(line, wrapper, tags){
        const regex = new RegExp(`(\\${wrapper.split("").join("\\")})`, "i")

        let openingTagGroup = ""
        let closingTagGroup = ""
        for (const tag of tags) {
            openingTagGroup += `<${tag}>`
            closingTagGroup += `</${tag}>`

        }

        let tokens = line.split(regex)
        
        // Closing wrapper found means that at least one closing wrapper was found, which could technically mean that there is another possible pair
        let closingWrapperFound = false

        // Index of the opening wrapper so it can be replaced with html tag upon finding a clossing wrapper
        let openingWrapperIndex = null

        do {
            closingWrapperFound = false
            openingWrapperIndex = null

            let tokenIndex = 0
            for (const token of tokens){

                if (token == wrapper){
                    if (openingWrapperIndex == null){
                        if (tokens[tokenIndex + 1] != null){
                            if (tokens[tokenIndex + 1][0] != " " && tokens[tokenIndex + 1].length != 0){
                                openingWrapperIndex = tokenIndex

                            }
                        }

                    } else {
                        if (tokens[tokenIndex - 1] != null){
                            if (tokens[tokenIndex - 1][tokens[tokenIndex - 1].length - 1] != " " && tokens[tokenIndex - 1].length != 0){
                                tokens[openingWrapperIndex] = openingTagGroup
                                tokens[tokenIndex] = closingTagGroup
                                closingWrapperFound = true

                                openingWrapperIndex = null
                            }
                        }

                    }
                }

                tokenIndex++
            }

        } while (closingWrapperFound)

        line = tokens.join("")

        return line
    }
}