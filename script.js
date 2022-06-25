console.log('script.js')

// set timeout to ensure initialization
setTimeout(editorValue, 4000)


function editorValue() {
    // declare pos and lineHandle variables to keep track of cursor
    var pos, lineHandle

    console.log('editorValue')

    // assign CodeMirror object
    editor = document.querySelector('.CodeMirror').CodeMirror

    // track cursor positions
    editor.on("cursorActivity", (evt) => {
        pos = editor.getCursor()
        lineHandle = editor.getLineHandle(pos.line)
    })

    // on any edit, send editor value to content
    editor.on("keyup", (evt) => {
        console.log(editor.getValue())
        pos = editor.getCursor()
        lineHandle = editor.getLineHandle(pos.line)

        window.postMessage({
            'source': 'meetcode',
            'data': [editor.getValue()]
        }, "*");
    })

    // on receipt of edit, set value and reposition cursor (otherwise defaults to start)
    window.addEventListener("message", function (event) {
        // console.log(event.data.source)
        if (event.data.source == 'content') {
            var lineNum = editor.getLineNumber(lineHandle)
            editor.setValue(event.data.data[0])
            editor.setCursor(lineNum, pos.ch)
        }
    });
}

console.log('end script')
