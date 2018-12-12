const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const engine = require('ejs-mate');
var Kafka = require('node-rdkafka');

const app = express();
const server = http.Server(app);
const io = socketIO(server);

// settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// middlewares

// routes
app.use(require('./routes'));

// sockets
require('./sockets')(io);

function callSockets(io, message) {
	io.sockets.emit('channel', message);
}


// Static files
app.use(express.static(path.join(__dirname, 'public')));


// Kafka setup
const kafka = require('kafka-node'),
    HighLevelConsumer = kafka.HighLevelConsumer,
    client = new kafka.Client(),
    consumer = new HighLevelConsumer(
        client,
        [
            { topic: 'output' }
        ]
    );
consumer.on('message', function (message) {
    callSockets(io,message)
    console.log(message);

});


// starting the server
server.listen(3000, () => {
  console.log('Server on port', 3000);
});