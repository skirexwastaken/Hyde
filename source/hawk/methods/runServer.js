export const runServer = {
    runServer(host, port) {
        this.server.once('error', (error) => {
            console.log(`Port ${port} is already used`)

        })

        this.server.listen(port, host, () => {
            console.log(`Hawk server is running at ${host} on port ${port}`)
            
        })
    }
}