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
import path from "node:path";
import {fileURLToPath} from "node:url"

import {markdownDirectory, htmlDirectory, scriptDirectory} from "../constants/paths.js"

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

            console.log(`[Garbage Collector] Removing ${htmlFile}`)

        }
    }

    for (const scriptFile of scriptFiles) {
        const markdownFile = scriptFile.replace(".fsc",".md")

        if (!(markdownFiles.includes(markdownFile))) {
            const scriptFilePath = path.resolve(scriptDirectory, scriptFile)
    
            fs.unlinkSync(scriptFilePath)

            console.log(`[Garbage Collector] Removing ${scriptFile}`)

        }
    }

    console.log("[Garbage Collector] Old files have been cleared")

}

if (process.argv[1] == fileURLToPath(import.meta.url)) {
    garbageCollector()

}