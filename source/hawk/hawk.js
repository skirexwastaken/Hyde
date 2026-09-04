import http from "http";

export class Hawk{
    constructor(host, port){
        this.host = host
        this.port = port

        this.createServer()
        this.runServer()
    }

    createServer(){
        this.server = http.createServer((request, result) => {
            if (request.url == "/"){
                result.statusCode = 200
                result.setHeader('Content-Type', 'text/plain')
                result.end('Hello, World!')

            } else if (request.url == "/dan"){
                result.statusCode = 200
                result.setHeader('Content-Type', 'text/plain')
                result.end("Heyo")

            } else {
                result.statusCode = 404
                result.setHeader('Content-Type', 'text/plain')
                result.end("Page not found")
            }
        })
    }

    runServer(){
        this.server.listen(this.port, this.host, () => {
            console.log(`Hawk server is running at ${this.host} on port ${this.port}`)

        })
    }
}