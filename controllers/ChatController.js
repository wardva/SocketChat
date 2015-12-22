/**
 * @author Ward Van Assche
 * @date 17/12/2015
 */
'use strict';
//Modules
var _ = require('lodash');

exports.index = function(req, res) {
    res.render('chat', {
    	active: 'chat',
        title: 'Private chat'
    });
};

var users = {}; //Map: id -> name of the user

//New connected user
exports.connected = function(socket) {
    //Give the new user a list of the existing connected users.
    socket.emit('allusers', {
        users: users
    });
    //Add the new user to our map.
    users[socket.id] = socket.id;
    //Broadcast the new user his id to the existing users.
    //He does not have a name yet.
    socket.broadcast.emit('userconnected', {
        id: socket.id
    });
}

//A user disconnected.
exports.disconnected = function(socket) {
    //Delete the user from the map.
    delete users[socket.id];
    //Broadcast to the existing users.
    socket.broadcast.emit('userdisconnected', {
        id: socket.id
    });
}

//A user wants to change his name.
exports.namechanged = function(socket, data) {
    //Change name in map
    users[socket.id] = data.name;
    //Broadcast to the existing users
    socket.broadcast.emit('namechanged', {
        name: data.name,
        id: socket.id
    });
}

//A user sent a message to another user.
exports.sendmessage = function(socket, data) {
    socket.to(data.id).emit('newmessage', {
        message: data.message,
        name: users[socket.id]
    });
}