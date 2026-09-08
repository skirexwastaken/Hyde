export const convert = {
    convert(filename) {
        const rawMarkdown = this.getMarkdown(filename)

        const processedMarkdown = this.processMarkdown(rawMarkdown, filename)

        const generatedHTML = this.generateHTML(processedMarkdown)

        this.saveHTML(filename, generatedHTML)

        return generatedHTML

    }
}