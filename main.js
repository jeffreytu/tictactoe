// Tic Tac Toe
// By Jeffrey Tu
// **************************************************
// The game logic is set up by assigning a letter, in
// alphabetical order, to each square from left to 
// right, top to bottom.
// **************************************************

var record = {
	game: {
		"moveNumber": 1,
		"movePool": [],
		"winSet": ["abc","def","ghi","adg","beh","cfi","aei","gec"]
	},
	players: { 
		p1: {
			"title": "Player 1",
			"moves": [],
			"color": "#2F8B69",
			"marker": "X"
		},
		p2: {
			"title": "Player 2",
			"moves": [],
			"color": "#AC4343",
			"marker": "O"
		}
	}
}

//Begin listening for DOM clicks
document.addEventListener('click', gameRoute, false);

function reset() {
	record.game.moveNumber = 1;
	record.game.movePool = [];
	record.players.p1.moves = [];
	record.players.p2.moves = [];

	//Clear all field display markers
	var fieldLength = document.getElementsByClassName("field").length;
	for (u=0; u<fieldLength; u++) {
		if (document.getElementsByClassName("field")[u].hasAttribute("style")) {
			document.getElementsByClassName("field")[u].removeAttribute("style");
			document.getElementsByClassName("field")[u].innerHTML = "&nbsp;";
		}
	}
	document.getElementById('log').innerHTML = "&nbsp;";
	document.addEventListener('click', gameRoute, false);
}

function log(message) {
	var log = document.getElementById('log');
	log.innerHTML = message;
}

function gameRoute(e) {
	var pick = e.target.id;
	var moveNumber = record.game.moveNumber;

	if (e.target.className == "field") {
    	//Odd moves (first player)
	    if (moveNumber % 2 == 1 || moveNumber % 2 == NaN && moveNumber <= 10) {
	    	calcMove(record.players.p1, pick, record.game);
	    }
	    //Even moves (second player)
	    else if (moveNumber % 2 == 0 && moveNumber <= 10) {
	    	calcMove(record.players.p2, pick, record.game);
	    }
	}
}

function calcMove(player, pick, game) {
	checkPlacementExist(player, pick, game.movePool, game.moveNumber);
	if (checkWin(player, game.moveNumber) == true) {
		log(player.title + " wins!");
		document.removeEventListener('click', gameRoute);
	}
	//No one wins
	else if (checkWin(player) !== true && game.moveNumber == 10) {
		log("Cat's game!");
		document.removeEventListener('click', gameRoute);
	}
}

function checkPlacementExist(player, pick, movePool) {
    if (movePool.indexOf(pick) > -1 || movePool.indexOf(pick) > -1) {
		// log("Space taken")
	}
	else if (movePool.indexOf(pick) < 0) {
		document.getElementById(pick).style.backgroundColor=player.color;
		document.getElementById(pick).innerHTML = player.marker;
		player.moves.push(pick);
		movePool.push(pick);
		record.game.moveNumber++;
	}
}

function checkWin(player, moveNumber) {
	var win = record.game.winSet;
	if (moveNumber > 5) {
		//Check each win set
		for (s=0; s<win.length; s++) {
			var checkAgainst = win[s].split('');
			//loop through player picks
			var noOfMatches = 0
			for (t=0; t<player.moves.length; t++) {
				//check for player matches with win set
				if (checkAgainst.indexOf(player.moves[t]) > -1) {
					noOfMatches++;
					if (noOfMatches === 3) {
						return true;
					}
				}
			}
		}
	}
}