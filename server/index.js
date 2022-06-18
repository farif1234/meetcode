const log = console.log
// initialize http server, socket.io and port number
const http = require('http').createServer()
const io = require("socket.io")(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const port = process.env.PORT || 3000

http.listen(port, () => log(`server listening on port: ${port}`))

io.on('connection', (socket) => {
    log(socket.id)
    log('connected')
    socket.on('message', (evt) => {
        log(evt)
        socket.broadcast.emit('message', evt)
    })

})

io.on('disconnect', (evt) => {
    log('some people left')
})