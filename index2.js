var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(5555);

io.attach(http, {
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

//Whenever someone connects this gets executed

io.on('connection', function (socket) {
    console.log('A user connected');

    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });

    socket.on('direct', function (msg) {
        console.log("direct to: " + msg);
        io.emit('direct', msg);
    });

    socket.on('toggle', function (msg) {
        console.log("toggle: " + msg);
        io.emit('toggle', msg)
    });

    socket.on('message', function (msg) {
        console.log(msg);
    });


    socket.on('retrievePercent', function(msg){
        io.emit("onPercentUpdate", msg);
    });

    // timeout();
});
// function timeout() {
//     setTimeout(function () {
//         io.emit('direct', "forward");
//         timeout();
//     }, 1000);
// }
http.listen();