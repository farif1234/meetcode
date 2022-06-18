// client.js
// editor = document.querySelector('.CodeMirror').CodeMirror
// editor.getValue()
// editor.on("keyup", (evt) => {console.log('keyup')})
console.log('client')

chrome.storage.local.get("key", (result) => {
    // alert(result.key)
    // console.log(result)
    document.getElementById('userID').textContent = result.key
})
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