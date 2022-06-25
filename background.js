import { io } from "/server/node_modules/socket.io-client/dist/socket.io.esm.min.js";

var socket

// from client
chrome.runtime.onMessage.addListener((message, sender, reply) => {
    console.log(message, sender)
    if (message.room == 'disconnect') {
        socket.disconnect()
    }
    else if (message.source == 'client') {
        var roomID = message.room
        connect(roomID)
    }

    // reply({ result: socket })
    // return true;
});


async function connect(roomID) {

    socket = await io('https://polar-badlands-20374.herokuapp.com/', { transports: ['websocket'] })
    // socket = await io('http://localhost:3000', { transports: ['websocket'] })
    console.log(socket)

    socket.on('connect', function () {
        socket.emit("room", roomID)
        console.log("connected to " + roomID);
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    });

    socket.on('message', async (val) => {
        console.log("received" + val)
        // send to content
        let queryOptions = { active: true, currentWindow: true };
        let tabs = await chrome.tabs.query(queryOptions);
        // console.log(tabs)
        chrome.tabs.sendMessage(tabs[0].id, { data: val });
    });

    socket.on("disconnect", (reason) => {
        if (reason === "io server disconnect") {
            // the disconnection was initiated by the server, reconnect manually
            socket.connect();
        }
        // else the socket will automatically try to reconnect
        // chrome.runtime.reload()
    });



    // receive from content, emit to server
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log(request)
            console.log(sender)
            socket.send(request.data.data)
        }
    )

    console.log('background')
};