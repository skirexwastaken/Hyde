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

import {loadMarkdown} from "./methods/inputOutput/loadMarkdown.js"
import {saveHtml} from "./methods/inputOutput/saveHtml.js"

import {compileFractalCode} from "./methods/segmentSpecific/fractal/compileFractalCode.js"
import {extractFractal} from "./methods/segmentSpecific/fractal/extractFractal.js"

import {processJsonWeb} from "./methods/segmentSpecific/processJsonWeb.js"
import {processWrapper} from "./methods/segmentSpecific/processWrapper.js"

import {convert} from "./methods/convert.js"
import {generateHtml} from "./methods/generateHtml.js"
import {reflowMarkdown} from "./methods/reflowMarkdown.js"

export class Marker {

}

Object.assign(
    Marker.prototype,
    
    loadMarkdown,
    saveHtml,

    compileFractalCode,
    extractFractal,

    processJsonWeb,
    processWrapper,

    convert,
    generateHtml,
    reflowMarkdown,

)