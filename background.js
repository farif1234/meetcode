import { io } from "/node_modules/socket.io-client/dist/socket.io.esm.min.js";
var socket = io('https://polar-badlands-20374.herokuapp.com/', { transports: ['websocket'] })
// var socket = io('http://localhost:3000', { transports: ['websocket'] })
console.log(socket)

// key = 'userID'
setTimeout(storeData, 2000)

function storeData() {
    const socket_id = String(socket.id)
    console.log(socket_id)
    chrome.storage.local.set({ key: socket_id }, () => {
        // chrome.storage.sync.get(null, function callback(items) { console.log(items) });
        chrome.storage.local.get("key", (result) => {
            console.log(result.key)
        })
        console.log(socket.id + ' added to storage')
    })
}

socket.on('connect', function () {
    console.log("connected");
});

socket.on('message', (val) => {
    console.log("received" + val)
    // chrome.runtime.sendMessage({ data: val })
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { data: val });
    });
})


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



// console.log(document.getElementById('button'))

// try {
//     importScripts("/node_modules/socket.io-client/dist/socket.io.js")

// } catch (e) {
//     console.log('ERROR')
//     console.error(e)
// }


// self.addEventListener('install', function (event) {
//     console.log('installed')
//     var socket = io('http://localhost:3000')
//     console.log(socket)
//     socket.on('connect', function () {
//         console.log("test");
//     });
// })
// import io from 'socket.io-client';
console.log('background')
// chrome.browserAction.onClicked.addListener(function (tab) {
//     for the current tab, inject the "inject.js" file & execute it
//     chrome.tabs.executeScript(tab.ib, {
//         file: 'inject.js'
//     });
//     console.log('clicked')
// });


// console.log(socket)

// socket.on('connect', function () {
//     console.log("test");
// });
// socket.on('connect', async () => {
//     connectionStatus = messagePayloads.CONNECTED;
//     const packet = {
//         type: messageTypes.CONNECTION_CHANGE,
//         payload: connectionStatus,
//     }

// });

// document.getElementById('button').addEventListener('click', () => {
//     console.log('button click')
//     var socket = io('http://localhost:3000');
// });

// window.addEventListener('beforeunload', function (e) {
//     e.preventDefault();
//     e.returnValue = ' ';
// });

// socket.send('hi')

// console.log(socket)