export const processWrapper = {
    // This function focuses on procesing wrapper syntax, such as **Example of text**
    processWrapper(line, wrapper, regex, tag){
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
                                tokens[openingWrapperIndex] = `<${tag}>`
                                tokens[tokenIndex] = `</${tag}>`
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