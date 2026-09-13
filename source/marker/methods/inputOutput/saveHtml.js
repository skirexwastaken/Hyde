import fs from "node:fs"
import path from "node:path"

import {htmlDirectory} from "../../../constants/paths.js"

export const saveHtml = {
    // Function that saves the output html file
    saveHtml(filename, generatedHTML, cssFile, iconFile, htmlTitle){
        for (let index = 0; index < generatedHTML.length; index++){
            generatedHTML[index] = `      ${generatedHTML[index]}`
        }

        const htmlFileContent = 
            "<!DOCTYPE html>\n" +
            "<html lang='en'>\n" +
            "<head>\n" +
            "   <meta charset='UTF-8'>\n" +
            "   <meta name='viewport' content='width=device-width, initial-scale=1.0'>\n" +
            `   <title>${htmlTitle!= "" ? htmlTitle : filename.split('.')[0]}</title>\n` +
            `   <link rel='icon' type='image/x-icon' href='${iconFile}'>` +
            `   <link rel="stylesheet" href="${cssFile}">\n` +
            "</head>\n" +
            "<body>\n" +
            "   <div class='markdownContainer'>\n" +
            `${generatedHTML.join("\n")}\n` +
            "   <div>\n" +
            "</body>\n" +
            "</html>\n"

        const htmlFile = filename.replace(".md",".html")
        const htmlFilePath = path.resolve(htmlDirectory, htmlFile)

        fs.writeFileSync(htmlFilePath, htmlFileContent, "utf8")

        console.log(`[Marker] Processed file ${htmlFile}`)

        return htmlFileContent
    }
}