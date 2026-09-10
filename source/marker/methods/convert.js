export const convert = {
    convert(filename) {
        const rawMarkdown = this.getMarkdown(filename)

        const processedMarkdown = this.processMarkdown(rawMarkdown, filename)

        const [generatedHTML, cssFile] = this.generateHTML(processedMarkdown)

        return this.saveHTML(filename, generatedHTML, cssFile)

    }
}