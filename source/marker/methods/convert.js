export const convert = {
    convert(filename) {

        // 1. Loading content of the specified Markdown file
        const markdownContent = this.loadMarkdown(filename)

        // 2. Processed markdown is something between html and Markdown file, it contains things from both
        // This is the stage when Fractal code is extracted
        const [processedMarkdown, fractalBytecode] = this.processMarkdown(markdownContent, filename)

        // 3. At this point there is pure html file generated
        const [generatedHTML, cssFile, iconFile, htmlTitle] = this.generateHtml(processedMarkdown)

        // 4. Returning html file and fractalBytecode to loCache
        return [this.saveHtml(filename, generatedHTML, cssFile, iconFile, htmlTitle), fractalBytecode]

    }
}