const { subscribe } = require("node:diagnostics_channel")
const fs = require("node:fs")

class Marker{
    constructor(filename){
        const rawMarkdown = this.getMarkdown(filename)

        const processedMarkdown = this.processMarkdown(rawMarkdown)

        const generatedHTML = this.generateHTML(processedMarkdown)

        this.saveHTML(filename, generatedHTML)

        console.log(generatedHTML)
    }

    // Function that loads the raw markdown file
    getMarkdown(filename){
        return fs.readFileSync(filename, "utf8")

    }

    // Function that saves the output html file
    saveHTML(filename, generatedHTML){
        /*

        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            
        </body>
        </html>
        */

        filename = filename.replace(".md",".html")

        //fs.writeFileSync(filename, generatedHTML.join("\n"), "utf8")

    }

    // The main goal of this function is to simply determine where new lines should start
    processMarkdown(rawMarkdown){
        // Removing comments and splitting the file content into separate lines
        rawMarkdown = rawMarkdown.replace(/<!--[\s\S]*?-->/g,"").split("\n")

        // The symbol \ indicates a new line
        const splitMarkdown = []
        for (const line of rawMarkdown){
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

        return processedMarkdown
    }

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
                            if (tokens[tokenIndex + 1][0] != " "){
                                openingWrapperIndex = tokenIndex

                            }
                        }

                    } else {
                        if (tokens[tokenIndex - 1] != null){
                            if (tokens[tokenIndex - 1][tokens[tokenIndex - 1].length - 1] != " "){
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

    // Function that converts the processed markdown into pure HTML
    generateHTML(processedMarkdown){
        let generatedHTML = []
        let insideCodeBlock = false

        for (let line of processedMarkdown){

            // Similar logic as in processMarkdown function for code blocks
            if (line.trim() == "```"){
                if (insideCodeBlock == false){
                    insideCodeBlock = true
                    generatedHTML.push("<code>")

                } else {
                    insideCodeBlock = false
                    generatedHTML.push("</code>")

                }

                continue

            // Line that's part of code block
            } else if (insideCodeBlock == true) {
                generatedHTML.push(`<p>${line}</p>`)

                continue

            // Line on which styles are applied
            // Note: Some of the easier syntax is simply processed by regex but some of the more complex one requires custom interpreter, such as wrappers
            } else {

                // Title H1 <-> H6
                // Note: Styles are also not applied to titles
                if (["#"].includes(line[0])){
                    switch (line[0]) {
                        case "#":

                            // Valid title needs to have 1 <-> 6 # followed by whitespace
                            line = line.replace(/^(#*)\s*(.*)/, (match, subString1, subString2) => {
                                if (subString1.length < 7){
                                    return `<h${subString1.length}>${subString2}</h${subString1.length}>`

                                } else {
                                    return match

                                }
                            })

                            break
                    }
                
                } else {

                    // Inline code block
                    line = line.replace(/`{3}(.*)`{3}/g,"<code>$1</code>").replace(/`{2}(.*)`{2}/g,"<code>$1</code>").replace(/`{1}(.*)`{1}/g,"<code>$1</code>")

                    // Standard line
                    line = `<p>${line}</p>`

                    line = this.processWrapper(line, "**", /(\*\*)/, "strong")

                    line = this.processWrapper(line, "*", /(\*)/, "strong")


                    generatedHTML.push(line)

                }
            }
        }

        return generatedHTML
    }
}

new Marker("Example.md")