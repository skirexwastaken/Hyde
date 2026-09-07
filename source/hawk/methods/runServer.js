export const runServer = {
    runServer(host, port) {
        this.server.listen(port, host, () => {
            console.log(`Hawk server is running at ${host} on port ${port}`)

        })
    }
}