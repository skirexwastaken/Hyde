import fs from "node:fs"
import path from "node:path"

import {templatesDirectiory} from "../constants/paths.js"

export const saveHTML = {
    // Function that saves the output html file
    saveHTML(filename, generatedHTML){
        for (let index = 0; index < generatedHTML.length; index ++){
            generatedHTML[index] = `    ${generatedHTML[index]}`
        }


        const HTMLFile = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
${generatedHTML.join("\n")}
</body>
</html>
`   

        filename = filename.replace(".md",".html")

        const fullPath = path.resolve(templatesDirectiory, filename)

        fs.writeFileSync(fullPath, HTMLFile, "utf8")

        console.log(`[Marker] Processed file ${filename}`)
    }
}