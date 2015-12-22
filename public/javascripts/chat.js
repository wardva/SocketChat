/**
 * @author Ward Van Assche
 * @date 17/12/2015
 */
'use strict';
var socket = io.connect('http://localhost:3000');
var users = {}; //map: id -> name

//A new user has been connected
socket.on('userconnected', function(data) {
	addUser(data.id, data.id);
});

//A user has been disconnected
socket.on('userdisconnected', function(data) {
	$("li#user-" + data.id).remove();
	$("option#dest-" + data.id).remove();
	delete users[data.id];
});

//The name of a user has been changed
socket.on('namechanged', function(data) {
	users[data.id] = data.name;
	$("li#user-" + data.id + '> a').html(data.name);
	$("option#dest-" + data.id).html(data.name);
});

//Triggered when the user just has connected to the server
//This function the users who were already connected.
socket.on('allusers', function(data) {
	_.each(data.users, function(name, id) {
		addUser(id, name);
	})
});

//New message received
socket.on('newmessage', function(data) {
	var messagesBlock = $('#messages');
	var message = $('<div class="message"><p class="from">Message from ' + data.name + '</p><p class="text">' + data.message + '</p>');
	messagesBlock.append(message);
});

//Change name form submitted
$('#changename-form').submit(function(event) {
	//No referesh
	event.preventDefault();
	var field = $('input#name-field');
	var name = field.val();
	if(name) {
		socket.emit('namechanged', {
			name: name
		});
	}
	return false;
});

//Message form submitted
$('#message-form').submit(function(event) {
	//No refresh!
	event.preventDefault();
	var box = $('#message-box');
	var message = box.val();
	var destination = $('#destination').val();
	if(destination && message) {
		message = message.replace(/\r?\n/g, '<br />');
		socket.emit('message', {
			id: destination,
			message: message
		});
		box.val('');
	}
	return false;
});

//User wants to exit the tab/page
window.unload = function() {
    socket.disconnect();
}

//Add a new user
function addUser(id, name) {
	users[id] = name;

	//Update the user list (left pane)
	var listElement = $('<li id="user-' + id + '"> <a href="#">' + name + '</a></li>');
	$("#users").append(listElement);

	//Update the select element
	var destElement = $('<option id="dest-' + id + '" value="' + id + '">' + name + '</option>');
	$('select#destination').append(destElement);
}