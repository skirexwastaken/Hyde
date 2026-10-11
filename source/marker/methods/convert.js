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