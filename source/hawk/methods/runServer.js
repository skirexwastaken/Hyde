export const runServer = {
    runServer(host, port) {
        this.server.once('error', (error) => {
            console.log(`[Hawk] Port ${port} is already used`)

        })

        this.server.listen(port, host, () => {
            console.log(`[Hawk] Server is running at ${host} on port ${port}`)
            
        })
    }
}