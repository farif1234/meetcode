// client.js
// editor = document.querySelector('.CodeMirror').CodeMirror
// editor.getValue()
// editor.on("keyup", (evt) => {console.log('keyup')})
console.log('client')
chrome.storage.local.get("status", (result) => {
    console.log(result)
    if (result.status == 'connected') {
        chrome.storage.local.get("key", (result) => {
            console.log(result.key)
            hideConnect(result.key)
        })

    }
})

// let page = chrome.runtime.getBackgroundPage();
// chrome.runtime.getBackgroundPage((window) => {
//     document.getElementById("connect").addEventListener("click", window.connect());
// });

function hideConnect(roomID) {

    document.getElementById('roomID').textContent = roomID
    document.getElementById('beforeConnect').style.display = 'none'
    document.getElementById('disconnect').style.display = 'block'
}

function showConnect() {
    chrome.storage.local.set({ key: roomID, status: 'disconnected' }, () => {
        // chrome.storage.local.get("key", (result) => {
        //     console.log(result.key)
        // })
        console.log(roomID + ' added to storage')
    })
    document.getElementById('roomID').textContent = 'Not Connected'
    document.getElementById('beforeConnect').style.display = 'block'
    document.getElementById('disconnect').style.display = 'none'

}

document.getElementById('newRoom').addEventListener('click', function () {
    var roomID = String(Math.floor(Math.random() * 999999))
    // alert(roomID)
    // send to background
    chrome.runtime.sendMessage({ source: "client", room: roomID },
        function (response) {
            hideConnect(roomID)
            chrome.storage.local.set({ key: roomID, status: 'connected' }, () => {
                // chrome.storage.local.get("key", (result) => {
                //     console.log(result.key)
                // })
                console.log(roomID + ' added to storage')
            })
            console.log(response);

            // chrome.storage.local.get("key", (result) => {
            //     // alert(result.key)
            //     // console.log(result)
            //     document.getElementById('roomID').textContent = result.key
            // })
        }
    );
});

document.getElementById('joinRoom').addEventListener('click', function () {
    var roomID = document.getElementById('roomInput').value

    // alert(roomID)
    // send to background
    chrome.runtime.sendMessage({ source: "client", room: roomID },
        function (response) {
            // console.log('RESPONSE')
            hideConnect(roomID)

            console.log(response);
            // chrome.storage.local.get("key", (result) => {
            //     // alert(result.key)
            //     // console.log(result)
            //     document.getElementById('roomID').textContent = result.key
            // })
        }
    );
});

document.getElementById('disconnect').addEventListener('click', function () {
    var roomID = ''
    // alert(roomID)
    // send to background
    chrome.runtime.sendMessage({ source: "client", room: 'disconnect' },
        function (response) {
            showConnect()
            console.log(response);
            // chrome.storage.local.get("key", (result) => {
            //     // alert(result.key)
            //     // console.log(result)
            //     document.getElementById('roomID').textContent = result.key
            // })
        }
    );
});
// chrome.storage.local.get("key", (result) => {
//     // alert(result.key)
//     // console.log(result)
//     document.getElementById('userID').textContent = result.key
// })

// document.getElementById("connect").addEventListener("click", page.connect());
// document.getElementById("getID").addEventListener("click", getID);

// function getID() {
//     chrome.storage.local.get("key", (result) => {
//         alert(result.key)
//         console.log(result)
//         document.getElementById('userID').textContent = result.key
//     })
//     // chrome.storage.local.get(key, (result) => {
//     //     console.log(result)
//     //     console.log('RESULT: ' + result.userID)
//     //     document.getElementById('userID').innerText = result.userID
//     // })
// }


// var socket = io('http://localhost:3000');
// console.log(socket)
// const l = console.log
// function getEl(id) {
//     return document.getElementById(id)
// }
// const editor = getEl("editor")
// editor.addEventListener("keyup", (evt) => {
//     const text = editor.value
//     socket.send(text)
// })
// socket.on('message', (data) => {
//     editor.value = data
// })

// editor.on("keyup", (evt) => {
//     socket.send(editor.getValue())
// })

// socket.on('message', (data) => {
//     editor.setValue(data)
// })