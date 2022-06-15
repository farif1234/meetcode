// import { io } from "./node_modules/socket.io-client/dist/socket.io.js";

try {
    importScripts("./node_modules/socket.io-client/dist/socket.io.js")
} catch (e) {
    console.log('ERROR')
    console.error(e)
}
// import io from 'socket.io-client';
console.log('background')
// chrome.browserAction.onClicked.addListener(function (tab) {
//     for the current tab, inject the "inject.js" file & execute it
//     chrome.tabs.executeScript(tab.ib, {
//         file: 'inject.js'
//     });
//     console.log('clicked')
// });

var socket = io('http://localhost:3000');
console.log(socket)

socket.emit('hello')
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