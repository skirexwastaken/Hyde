// Function that converts the processed markdown into pure HTML
export const generateHtml = {
    generateHtml(processedMarkdown){
        let generatedHTML = []
        let insideCodeBlock = false

        // Default style if no style is specified
        let cssFile = "dark.css"

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
                line = line.replace(/\@\[(\S*?)\]/g, (match, subString) => {
                    cssFile = subString

                    return ""
                })

                line = line.replace(/\[(.*)\]\((\S.*)\)/g, (match, name, route) => {
                    return `<a href="${route}">${name}</a>`
                    
                })

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

                // Standard line
                } else {

                    // Empty lines are skipped
                    if (line == "") {
                        continue

                    }

                    line = `<p>${line}</p>`

                    // Code block
                    line = this.processWrapper(line, "```", /(\`\`\`)/, "code")

                    line = this.processWrapper(line, "``", /(\`\`)/, "code")

                    line = this.processWrapper(line, "`", /(\`)/, "code")


                    // Bold style
                    line = this.processWrapper(line, "**", /(\*\*)/, "strong")

                    line = this.processWrapper(line, "*", /(\*)/, "strong")

                    // Italic style
                    line = this.processWrapper(line, "__", /(\_\_)/, "i")

                    line = this.processWrapper(line, "_", /(\_)/, "i")

                    // Striked style
                    line = this.processWrapper(line, "~~", /(\~\~)/, "s")

                    line = this.processWrapper(line, "~", /(\~)/, "s")

                }

                generatedHTML.push(line)

            }
        }

        return [generatedHTML, cssFile]
    }
}