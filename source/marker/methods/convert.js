export const convert = {
    convert(filename) {
        const rawMarkdown = this.getMarkdown(filename)

        const processedMarkdown = this.processMarkdown(rawMarkdown)

        const generatedHTML = this.generateHTML(processedMarkdown)

        this.saveHTML(filename, generatedHTML)

        return generatedHTML

    }
}