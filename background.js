import { io } from "/node_modules/socket.io-client/dist/socket.io.esm.min.js";

var socket

// from client
chrome.runtime.onMessage.addListener((message, sender, reply) => {
    console.log(message, sender)
    if (message.source && message.room == 'disconnect') {
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

    // var socket = await io('https://polar-badlands-20374.herokuapp.com/', { transports: ['websocket'] })
    socket = await io('http://localhost:3000', { transports: ['websocket'] })
    console.log(socket)

    // setTimeout(storeData, 2000)

    // function storeData() {
    //     const socket_id = String(socket.id)
    //     console.log(socket_id)
    //     // set in storage, access from client
    //     chrome.storage.local.set({ key: socket_id }, () => {
    //         chrome.storage.local.get("key", (result) => {
    //             console.log(result.key)
    //         })
    //         console.log(socket.id + ' added to storage')
    //     })
    // }

    socket.on('connect', function () {
        socket.emit("room", roomID)
        console.log("connected to " + roomID);
    });

    socket.on('message', async (val) => {
        console.log("received" + val)
        // send to content
        let queryOptions = { active: true, currentWindow: true };
        let tabs = await chrome.tabs.query(queryOptions);
        // console.log(tabs)
        chrome.tabs.sendMessage(tabs[0].id, { data: val });
        // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //     chrome.tabs.sendMessage(tabs[0].id, { data: val });
    });
    // })

    // receive from content, emit to server
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            // console.log(sender.tab ?
            //             "from a content script:" + sender.tab.url :
            //             "from the extension");
            // if (request.greeting === "hello")
            //   sendResponse({farewell: "goodbye"});
            console.log(request)
            console.log(sender)
            socket.send(request.data.data)
        }
    )

    console.log('background')
};