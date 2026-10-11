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

// Function that converts a string into a number
// This is done by converting each character to its ascii values and then returning the sum of those ascii values
export const convertToNumberUsingAscii = {
    convertToNumberUsingAscii(string){
        let number = 0

        for (const char of string){
            if (isNaN(char)){
                number += Number(char.charCodeAt(0))

            } else {
                number += Number(char)

            }
        }

        return number
    }
}