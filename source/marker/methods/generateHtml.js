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

// Function that converts the processed markdown into pure HTML
export const generateHtml = {
    generateHtml(processedMarkdown){
        let generatedHTML = []
        let insideCodeBlock = false

        // Default style if no style is specified
        let cssFile = "core/dark.css"

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

                    if (!(line.startsWith("<p>")) && !(line.startsWith("<") && line.endsWith(">"))) {
                        line = `<p>${line}</p>`

                    }

                    // Code block
                    line = this.processWrapper(line, "```", ["code"])

                    line = this.processWrapper(line, "``", ["code"])

                    line = this.processWrapper(line, "`", ["code"])

                    // Bold and Italic style
                    line = this.processWrapper(line, "***", ["i", "strong"])

                    line = this.processWrapper(line, "___", ["i", "strong"])

                    // Bold style
                    line = this.processWrapper(line, "**", ["strong"])

                    line = this.processWrapper(line, "__", ["strong"])

                    // Italic style
                    line = this.processWrapper(line, "*", ["i"])

                    line = this.processWrapper(line, "_", ["i"])

                    // Striked style
                    line = this.processWrapper(line, "~~", ["s"])

                    line = this.processWrapper(line, "~", ["s"])

                }

                generatedHTML.push(line)

            }
        }

        return [generatedHTML, cssFile, iconFile, htmlTitle]
    }
}