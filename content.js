console.log('content.js')



window.onload = (event) => {
    console.log('page is fully loaded');

    // receive edits from injected script and send to background
    window.addEventListener("message", function (event) {
        console.log(event.data.source)
        if (event.data.source == 'meetcode') {
            console.log("found event in post!", event.data)
            chrome.runtime.sendMessage({ data: event.data })
        }
    });

    // receive edits from background (server) and relay to script
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

    // inject script
    var s = document.createElement('script');
    s.src = chrome.runtime.getURL('script.js');
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);
};