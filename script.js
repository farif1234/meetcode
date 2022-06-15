

console.log('script.js')


setTimeout(editorValue, 4000)


function editorValue() {
    console.log('editorValue')
    editor = document.querySelector('.CodeMirror').CodeMirror

    editor.on("keyup", (evt) => {
        console.log(editor.getValue())
        // chrome.storage.local.set({ key: editor.getValue() }, function () {
        //     console.log('Value is set to ' + value);
        // });
        window.postMessage({
            'source': 'meetcode',
            'data': [editor.getValue()]
        }, "*");
    })
};


console.log('end script')
