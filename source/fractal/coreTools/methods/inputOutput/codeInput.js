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

// Function that loads the raw code string into memory
export const codeInput = {
    codeInput(code){
        // This function loads the code and also implements support for no codeblocks
        // This is done by removing  strings and checking if there are any instances of the [
        // The reason behind this is to allow simple scripts, such as simple print('Hello World'), to be written more easily
        const codeWithoutStrings = code.replace(/'[^']*'/g,"")

        if (!(codeWithoutStrings.includes("[")) && !(codeWithoutStrings.includes("]"))) code = `[${code}]`

        return code
    }
}