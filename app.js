/**
 * @author Ward Van Assche
 * @date 25/01/2015
 */

var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

var bodyParser = require('body-parser');
var path = require('path');

app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'jade');  

app.use(bodyParser.json());  
app.use(express.static(path.join(__dirname, 'public')));  

server.listen(3000, function () {
  console.log('SocketChat started on port 3000!');
});

require('./config/routes.js')(app, io);