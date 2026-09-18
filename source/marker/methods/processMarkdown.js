export const processMarkdown = {
    // The main goal of this function is to simply determine where new lines should start
    processMarkdown(markdownContent, filename){

        // Removing comments
        // Regex is looking of <!-- ... -->
        markdownContent = markdownContent.replace(/<!--[\s\S]*?-->/g,"")

        // Forms interpreter
        markdownContent = markdownContent.replace(/<@==([\S\s]*?)===>/g, (match, content) => {
            content = content.replace(/input\[([\S\s]*?)\]\((\S*?)\)/g, (match, message, variableName) => {
                 return `<p>${message}: <input type="text" name="${variableName}"></p>`

            })

            content = content.replace(/submit\(([\S\s]*?)\)/g, (match, message) => {
                return `<button type="submit">${message}</button>`

            })

            return `<form method="post">${content}</form>`

        })

        // Extracting Fractal code from the Markdown file
        let fractalCode
        [markdownContent, fractalCode] = this.extractFractal(markdownContent, filename)

        // Adding styles to dictionaries inside of the JSON web tag
        markdownContent = this.processJsonWeb(markdownContent)
        markdownContent = markdownContent.split("\n")

        // The symbol \ indicates a new line
        const splitMarkdown = []
        for (const line of markdownContent){
            if (line.endsWith("\\")){
                splitMarkdown.push(line.slice(0, -1))
                splitMarkdown.push("")

            } else {
                splitMarkdown.push(line)

            }
        }

        const processedMarkdown = []
        let insideCodeBlock = false
        let lineIndex = 0

        // Processing each line of markdown
        for (const line of splitMarkdown){

            // ``` indicates code block start or end
            // Note: No additional styles should be applied to lines inside of code block
            if (line.trim() == "```"){
                if (insideCodeBlock){
                    insideCodeBlock = false

                } else {
                    insideCodeBlock = true

                }

                processedMarkdown.push("```")

            } else {

                // If a line is not part of a code block, styles are applied
                if (!insideCodeBlock){

                    // First line is simply added to the proccessed markdown array
                    if (processedMarkdown.length == 0 && line != "") {
                        processedMarkdown.push(line)
                    
                    } else if (processedMarkdown.length != 0){

                        // Lines with no formating that don't have an empty line between each other are merged together on one line
                        if (splitMarkdown[lineIndex - 1] != "" && !["#","`","<",">","*"].includes(line[0]) && !["#","`","<",">","*"].includes(processedMarkdown[processedMarkdown.length - 1][0])){
                            processedMarkdown[processedMarkdown.length - 1] += ` ${line}`

                        } else {
                            if (line != ""){
                                processedMarkdown.push(line)

                            }
                        }
                    }
                
                // Line that's inside of a code block
                } else {
                    processedMarkdown.push(line)

                }
            }

            lineIndex++
        }

        return [processedMarkdown, fractalCode]
    }
}