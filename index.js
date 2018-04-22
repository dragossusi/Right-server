var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var HashMap = require('hashmap');
var players = new HashMap();

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
	console.log("Player Connected!");
	socket.emit('socket_id',{id: socket.id});
	socket.emit('get_players', players.values());
	socket.on('player_moved', function(data) {
		const id = data.id;
        players.get(id).x = data.x;
        players.get(id).y = data.y;
        socket.broadcast.emit('player_moved', data);
    });
	socket.on('disconnect', function(){
		console.log("Player Disconnected");
		socket.broadcast.emit('player_disconnected', { id: socket.id });
		players.delete(socket.id);
	});
	var player = new Player(socket.id,"asd",0,0)
	console.log(player.toString() + " added");
    socket.broadcast.emit('new_player', player);
    players.set(socket.id,player);
});

function Player(id,nume,x,y) {
	this.id = id;
	this.nume = nume;
	this.x = x;
	this.y = y;
};




var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    // note:  d is an object, and when converted to a string it will
    // end with a linefeed.  so we (rather crudely) account for that  
    // with toString() and then trim() 
    console.log("you entered: [" + 
        d.toString().trim() + "]");
    if(d.toString().trim() === "stop")
    	process.exit();
    if(d.toString().trim() === "players")
    	console.log(players);
  });

app.get('/', function(req, res){
  res.send(`<h1>
░░█▀░░░░░░░░░░░▀▀███████░░░░ <br>
░░█▌░░░░░░░░░░░░░░░▀██████░░░ <br>
░█▌░░░░░░░░░░░░░░░░███████▌░░ <br>
░█░░░░░░░░░░░░░░░░░████████░░ <br>
▐▌░░░░░░░░░░░░░░░░░▀██████▌░░ <br>
░▌▄███▌░░░░▀████▄░░░░▀████▌░░ <br>
▐▀▀▄█▄░▌░░░▄██▄▄▄▀░░░░████▄▄░ <br>
▐░▀░░═▐░░░░░░══░░▀░░░░▐▀░▄▀▌▌ <br>
▐░░░░░▌░░░░░░░░░░░░░░░▀░▀░░▌▌ <br>
▐░░░▄▀░░░▀░▌░░░░░░░░░░░░▌█░▌▌ <br>
░▌░░▀▀▄▄▀▀▄▌▌░░░░░░░░░░▐░▀▐▐░ <br>
░▌░░▌░▄▄▄▄░░░▌░░░░░░░░▐░░▀▐░░ <br>
░█░▐▄██████▄░▐░░░░░░░░█▀▄▄▀░░ <br>
░▐░▌▌░░░░░░▀▀▄▐░░░░░░█▌░░░░░░ <br>
░░█░░▄▀▀▀▀▄░▄═╝▄░░░▄▀░▌░░░░░░ <br>
░░░▌▐░░░░░░▌░▀▀░░▄▀░░▐░░░░░░░ <br>
░░░▀▄░░░░░░░░░▄▀▀░░░░█░░░░░░░ <br>
░░░▄█▄▄▄▄▄▄▄▀▀░░░░░░░▌▌░░░░░░ <br>
░░▄▀▌▀▌░░░░░░░░░░░░░▄▀▀▄░░░░░ <br>
▄▀░░▌░▀▄░░░░░░░░░░▄▀░░▌░▀▄░░░ <br>
░░░░▌█▄▄▀▄░░░░░░▄▀░░░░▌░░░▌▄▄ <br>
░░░▄▐██████▄▄░▄▀░░▄▄▄▄▌░░░░▄░ <br>
░░▄▌████████▄▄▄███████▌░░░░░▄ <br>
░▄▀░██████████████████▌▀▄░░░░ <br>
▀░░░█████▀▀░░░▀███████░░░▀▄░░ <br>
░░░░▐█▀░░░▐░░░░░▀████▌░░░░▀▄░ <br>
░░░░░░▌░░░▐░░░░▐░░▀▀█░░░░░░░▀ <br>
░░░░░░▐░░░░▌░░░▐░░░░░▌░░░░░░░ <br>
░╔╗║░╔═╗░═╦═░░░░░╔╗░░╔═╗░╦═╗░ <br>
░║║║░║░║░░║░░░░░░╠╩╗░╠═╣░║░║░ <br>
░║╚╝░╚═╝░░║░░░░░░╚═╝░║░║░╩═╝░ <br>
  	</h1>`);
});