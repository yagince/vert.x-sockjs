var page = require('webpage').create();
page.onConsoleMessage = function (msg) {
    console.log('PAGE CONSOLE : ' + msg);
};
page.open('http://192.168.33.10:8080/', function() {
    page.includeJs('http://cdn.sockjs.org/sockjs-0.3.4.js', function() {
        page.evaluate(function(){
            var sock = new SockJS('http://192.168.33.10:8080/testapp', 'websocket');
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
            };
        });
    });
});
setTimeout(function(){ phantom.exit(); }, 1000);
