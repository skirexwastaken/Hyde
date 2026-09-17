// Function that converts the processed markdown into pure HTML
export const generateHtml = {
    generateHtml(processedMarkdown){
        let generatedHTML = []
        let insideCodeBlock = false

        // Default style if no style is specified
        let cssFile = "dark.css"

        // Default icon if no icon is specified
        let iconFile = "favicon.ico"

        let htmlTitle = ""

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

                // CSS File - Marker Specific
                // Regex is looking for css(...)
                line = line.replace(/css\[(\S*?)\]/g, (match, filename) => {
                    cssFile = filename

                    return ""
                    
                })

                // Favicon file - Marker Specific
                // Regex is looking for icon(...)
                line = line.replace(/icon\[(\S*?)\]/g, (match, filename) => {
                    iconFile = filename

                    return ""

                })

                // Html Title - Marker Specifc
                // Regex is looking for title(...)
                line = line.replace(/title\[(\S*?)\]/g, (match, title) => {
                    htmlTitle = title

                    return ""

                })

                // Image - Marker Specific
                // Regex is looking for image[...](...)
                line = line.replace(/image\[([\S\s]*?)\]\((\S*?)\)/g, (match, altText, source) => {                    
                    return `<img src='${source}' alt='${altText}'>`

                })

                // Image - Markdown
                // Regex is looking for ![...](...)
                line = line.replace(/\!\[([\S\s]*?)\]\((\S*?)\)/g, (match, altText, source) => {                    
                    return `<img src='${source}' alt='${altText}'>`

                })


                // Website link - Marker Specific
                // Regex is looking for link[...](...)
                line = line.replace(/link\[(.*)\]\((\S.*)\)/g, (match, name, route) => {
                    return `<a href="${route}">${name}</a>`
                    
                })

                // Website - Markdown
                // Regex is looking for [...](...)
                line = line.replace(/\[(.*)\]\((\S.*)\)/g, (match, name, route) => {
                    return `<a href="${route}">${name}</a>`
                    
                })

                // Note - Marker Specific
                // Regex is looking for note(...)
                line = line.replace(/note\(([\s\S]*?)\)/g, (match, text) => {                    
                    return `<note>NOTE: ${text}</note>`

                })

                // Tip - Marker Specific
                // Regex is looking for tip(...)
                line = line.replace(/tip\(([\s\S]*?)\)/g, (match, text) => {                    
                    return `<tip>TIP: ${text}</tip>`

                })

                // Important - Marker Specific
                // Regex is looking for important(...)
                line = line.replace(/important\(([\s\S]*?)\)/g, (match, text) => {                    
                    return `<important>IMPORTANT: ${text}</important>`

                })

                // Warning - Marker Specific
                // Regex is looking for warning(...)
                line = line.replace(/warning\(([\s\S]*?)\)/g, (match, text) => {                    
                    return `<warning>WARNING: ${text}</warning>`

                })

                // Caution - Marker Specific
                // Regex is looking for caution(...)
                line = line.replace(/caution\(([\s\S]*?)\)/g, (match, text) => {                    
                    return `<caution>CAUTION: ${text}</caution>`

                })

                // Title H1 <-> H6
                // Note: Styles are also not applied to titles
                if (["#"].includes(line[0])){
                    switch (line[0]) {
                        case "#":

                            // Valid title needs to have 1 <-> 6 # followed by whitespace
                            // Regex is looking for # ...
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

                    if (line[0] != "<") {
                        line = `<p>${line}</p>`

                    }

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

        return [generatedHTML, cssFile, iconFile, htmlTitle]
    }
}