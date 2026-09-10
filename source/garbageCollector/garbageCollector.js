import fs from "node:fs"
import path from "node:path";

import {markdownDirectory} from './constants/paths.js'
import {htmlDirectory} from './constants/paths.js'
import {scriptDirectory} from './constants/paths.js'

// Garbage collector is a simple function that makes sure that there are no left over files if user decides to delete the Markdown file from which the files were generated
export function garbageCollector() {
    const markdownFiles = fs.readdirSync(markdownDirectory)
    const htmlFiles = fs.readdirSync(htmlDirectory)
    const scriptFiles = fs.readdirSync(scriptDirectory)

    for (const htmlFile of htmlFiles) {
        const markdownFile = htmlFile.replace(".html",".md")

        if (!(markdownFiles.includes(markdownFile))) {
            const htmlFilePath = path.resolve(htmlDirectory, htmlFile)

            fs.unlinkSync(htmlFilePath)

        }
    }

    for (const scriptFile of scriptFiles) {
        const markdownFile = scriptFile.replace(".fs",".md")

        if (!(markdownFiles.includes(markdownFile))) {
            const scriptFilePath = path.resolve(scriptDirectory, scriptFile)
    
            fs.unlinkSync(scriptFilePath)

        }
    }

    console.log("[Garbage Collector] Old files have been cleared")

}