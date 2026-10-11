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

export const runServer = {
    runServer(host, port) {
        const server = this.initServer()

        // Testing if the port is available before starting the server
        server.once('error', (error) => {
            console.log(`[Hawk] Port ${port} is already used`)

        })

        // Running the server
        server.listen(port, host, () => {
            console.log(`[Hawk] Server is running at ${host} on port ${port}`)
            
        })
    }
}