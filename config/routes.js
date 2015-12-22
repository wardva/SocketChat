/**
 * @author Ward Van Assche
 * @date 17/12/2015
 */
'use strict';
// controllers
var home = require('../controllers/HomeController');
var chat = require('../controllers/ChatController');

// expose the routes
module.exports = function(app, io) {

	//Home routes
    app.get('/', home.index);
    app.get('/about', home.about);
    app.get('/contact', home.contact);

    //Chat routes
    app.get('/chat', chat.index);

    //IO listeners
    io.on('connect', function(socket) {
    	chat.connected(socket);
    	socket.on('disconnect', function() {
    		chat.disconnected(socket);
    	});
    	socket.on('namechanged', function(data) {
    		chat.namechanged(socket, data);
    	});
        socket.on('message', function(data) {
            chat.sendmessage(socket, data);
        })
    });
};
