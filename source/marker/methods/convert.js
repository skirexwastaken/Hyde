export const convert = {
    convert(filename) {
        const rawMarkdown = this.getMarkdown(filename)

        const [processedMarkdown, fractalCode] = this.processMarkdown(rawMarkdown, filename)

        const [generatedHTML, cssFile] = this.generateHTML(processedMarkdown)

        return [this.saveHTML(filename, generatedHTML, cssFile), fractalCode]

    }
}