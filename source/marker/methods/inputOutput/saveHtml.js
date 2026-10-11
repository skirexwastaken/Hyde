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