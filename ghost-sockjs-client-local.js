var page = require('webpage').create();
page.onConsoleMessage = function (msg) {
    console.log('PAGE CONSOLE : ' + msg);
};
page.open('http://localhost:8080/', function() {
    page.includeJs('http://cdn.sockjs.org/sockjs-0.3.4.js', function() {
        page.evaluate(function(){
            var sock = new SockJS('http://localhost:8080/testapp', 'websocket');
            sock.onopen = function() {
                console.log('open');
                sock.send('hoge');
            };
            sock.onmessage = function(e) {
                console.log('message', e.data);
            };
            sock.onclose = function(e) {
                console.log('close');
                console.log(e);
                // phantom.exit(); //コンテキストが違うので、呼べない。
            };
        });
    });
});
setTimeout(function(){ phantom.exit(); }, 1000);
