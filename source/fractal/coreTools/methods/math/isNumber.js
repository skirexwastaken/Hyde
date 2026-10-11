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

// Function that checks if an argument is a number and if not applies the convertToNumberUsingAscii function on it
// This function is used for example when parsing an argument to a mathematical function such as add where the argument can't be a string
export const isNumber = {
    isNumber(argument){
        if (isNaN(argument)){
            return this.convertToNumberUsingAscii(argument)

        } else {
            return Number(argument)
        }
    }
} 