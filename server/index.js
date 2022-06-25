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
    log(socket.id + ' is connected')

    // join room
    socket.on('room', function (room) {
        log(socket.id + " joined " + room)
        socket.join(room);
        console.log(socket.rooms);
        console.log(Array.from(socket.rooms)[1]);
        console.log(io.sockets.adapter.rooms);
    });

    // emit message to room
    socket.on('message', (evt) => {
        log(evt)
        var roomID = Array.from(socket.rooms)[1];
        socket.to(roomID).emit('message', evt);
        // socket.broadcast.emit('message', evt)
    });

    socket.on('disconnect', (evt) => {
        log(socket.id + ' left')
    });

})

io.on('disconnect', (evt) => {
    log('some people left')
})