export const runServer = {
    runServer(host, port) {

        // Testing if the port is available before starting the server
        this.server.once('error', (error) => {
            console.log(`[Hawk] Port ${port} is already used`)

        })

        // Running the server
        this.server.listen(port, host, () => {
            console.log(`[Hawk] Server is running at ${host} on port ${port}`)
            
        })
    }
}