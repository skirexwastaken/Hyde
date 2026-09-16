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