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

import {Fractal} from "../../../../fractal/fractal.js"

export const compileFractalCode = {
    compileFractalCode(fractalCode, route) {
        let compiledBytecode = []
        for (const line of fractalCode) {
            const [bytecode, inputArguments] = line

            const fractalInstance = new Fractal({"compiler": true, "interpreter": false}, inputArguments)
            
            try {
                compiledBytecode.push([fractalInstance.compile(bytecode), inputArguments])

            } catch (error) {
                compiledBytecode.push([fractalInstance.compile("main [print()]"), inputArguments])

                console.log(`[Fractal] ${error.message} in file ${route.replace(".md","")}.fs`)
            }
        }

        return compiledBytecode

    }
}