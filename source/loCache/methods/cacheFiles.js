
import fs from "node:fs";
import path from "node:path";

import {markdownDirectory, scriptsDirectory} from "../constants/paths.js";

import {Fractal} from "../../fractal/fractal.js"

export const cacheFiles = {
    cacheFiles(route) {
        const fullPathMarkdown = path.resolve(markdownDirectory, `${route}.md`)
        const statsMarkdown = fs.statSync(fullPathMarkdown)

        const fullPathFractal = path.resolve(scriptsDirectory, `${route}.fs`)

        if (!(route in this.routeMap)) {  
            
            // Caching html
            const htmlFile = this.Marker.convert(`${route}.md`)

            this.routeMap[route] = this.cacheCounter++
            this.htmlFiles.push(htmlFile)
            this.filesModified.push(statsMarkdown.mtime)

            // Caching Fractal
            const fractalFile = JSON.parse(fs.readFileSync(fullPathFractal, "utf-8"))
            const inputArguments = fractalFile.pop()

            let compiledBytecode = []

            for (const line of fractalFile) {
                const fractalInstance = new Fractal(inputArguments)
                
                compiledBytecode.push(fractalInstance.compile(line))

            }

            this.fractalBytecodes.push(compiledBytecode)
            this.fractalInputArguments.push(inputArguments)
        
            console.log(`[loCache] ${route}.md has been cached`)

        } else {
            if (this.filesModified[this.routeMap[route]].getTime() != statsMarkdown.mtime.getTime()) {

                // Caching html
                const htmlFile = this.Marker.convert(`${route}.md`)

                this.htmlFiles[this.routeMap[route]] = htmlFile

                // Caching Fractal
                const fractalFile = JSON.parse(fs.readFileSync(fullPathFractal, "utf-8"))
                const inputArguments = fractalFile.pop()

                let compiledBytecode = []

                for (const line of fractalFile) {
                    const fractalInstance = new Fractal(inputArguments)
                    
                    compiledBytecode.push(fractalInstance.compile(line))

                }

                this.fractalBytecodes[this.routeMap[route]] = compiledBytecode
        
                this.fractalInputArguments[this.routeMap[route]] = inputArguments

                console.log(`[loCache] ${route}.md has been recached`)
            }
        }
    }
}