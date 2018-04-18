var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var players = [];

http.listen(3000, function(){
  console.log('listening on *:3000');
});

io.on('connection', function(socket){
	console.log("Player Connected!");
	players.push(player(socket.id,"asd",0,0));
	socket.emit('socket_id',{id: socket.id});
	socket.emit('get_players', players);
	socket.on('player_moved', function(data) {
        data.id = socket.id;
        console.log(`${data.x} ${data.y}`);
        for(var i = 0; i < players.length; ++i) {
            if(players[i].id == data.id) {
                players[i].x = data.x;
                players[i].y = data.y;
            }
        }
        socket.broadcast.emit('player_moved', data);
    });
	socket.on('disconnect', function(){
		console.log("Player Disconnected");
		socket.broadcast.emit('player_disconnected', { id: socket.id });
		for(var i = 0; i < players.length; i++){
			if(players[i].id == socket.id){
				players.splice(i, 1);
			}
        }
	});
});

function player(id,nume,x,y) {
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