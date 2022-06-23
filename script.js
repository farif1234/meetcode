

console.log('script.js')


setTimeout(editorValue, 4000)


function editorValue() {
    var pos, lineHandle

    console.log('editorValue')
    editor = document.querySelector('.CodeMirror').CodeMirror

    editor.on("keyup", (evt) => {
        console.log(editor.getValue())
        // chrome.storage.local.set({ key: editor.getValue() }, function () {
        //     console.log('Value is set to ' + value);
        // });
        pos = editor.getCursor()
        lineHandle = editor.getLineHandle(pos.line)

        window.postMessage({
            'source': 'meetcode',
            'data': [editor.getValue()]
        }, "*");
    })
    window.addEventListener("message", function (event) {
        // console.log(event.data.source)
        if (event.data.source == 'content') {
            // console.log("found event in post!", event.data)
            // chrome.runtime.sendMessage({ data: event.data })
            var lineNum = editor.getLineNumber(lineHandle)
            editor.setValue(event.data.data[0])
            editor.setCursor(lineNum, pos.ch)
        }
    });
}

console.log('end script')
