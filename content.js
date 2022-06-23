console.log('content.js')



window.onload = (event) => {
    console.log('page is fully loaded');
    // editor = document.querySelector('.CodeMirror').CodeMirror.getValue()
    //.CodeMirror

    // console.log(editor)
    //console.log(editor.getValue())

    // editor.on("keyup", (evt) => {
    //     console.log(editor.getValue())
    // })
    // var t = document.createElement('script');
    // t.src = chrome.runtime.getURL('./node_modules/socket.io-client/dist/socket.io.js');
    // t.onload = function () {
    //     this.remove();
    // };
    // (document.head || document.documentElement).appendChild(t);
    window.addEventListener("message", function (event) {
        console.log(event.data.source)
        if (event.data.source == 'meetcode') {
            console.log("found event in post!", event.data)
            chrome.runtime.sendMessage({ data: event.data })
        }
        // chrome.runtime.sendMessage({
        //     data: "test data"
        // }, function (response) {
        //     console.dir(response);
        // });
    });

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log('received data from background')
            console.log(request)
            console.log(sender)
            // socket.send(request)
            window.postMessage({
                'source': 'content',
                'data': request.data
            }, "*");
        }
    )

    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('script.js');
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
};