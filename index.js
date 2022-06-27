var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);

console.log("server started");

app.get("/", function(req, res){
    res.sendFile(__dirname +"/home.html");
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

});
