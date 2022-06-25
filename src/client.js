// client.js

console.log('client')

// when popup is open, check if socket is already connected and display accordingly
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
        console.log(roomID + ' added to storage')
    })
    document.getElementById('roomID').textContent = 'Not Connected'
    document.getElementById('beforeConnect').style.display = 'block'
    document.getElementById('disconnect').style.display = 'none'

}

document.getElementById('newRoom').addEventListener('click', function () {
    var roomID = String(Math.floor(Math.random() * 999999))

    // send to background
    chrome.runtime.sendMessage({ source: "client", room: roomID },
        function (response) {
            hideConnect(roomID)
            chrome.storage.local.set({ key: roomID, status: 'connected' }, () => {
                console.log(roomID + ' added to storage')
            })
            console.log(response);
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
        }
    );
});
