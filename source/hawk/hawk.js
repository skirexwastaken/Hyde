const http = require("http")

const port = "8080"
const host = "localhost"

const server = http.createServer((request, result) => {
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

server.listen(port, host, () => {
    console.log(`Hawk server is running at ${host} on port ${port}`)

})