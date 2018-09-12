var content=["","","","","","","","",""], player1turn=true, gameOngoing=true, chosenMark="X", otherMark="O";

$(document).ready(function(){
	var hasAI=true;
  $("#oneplayer").click(function(){
    if(!gameOngoing)hasAI=true;
  });
  $("#twoplayers").click(function(){
    if(!gameOngoing)hasAI=false;
  });
	$("td").click(function(){
		if(content[parseInt(this.id.charAt(4))]==""&&gameOngoing){
			if(player1turn){
				content[parseInt(this.id.charAt(4))]=chosenMark;
				$("#"+this.id).html(chosenMark);
				if(!hasAI) player1turn=false;
			}
			else{
				player1turn=true;
				content[parseInt(this.id.charAt(4))]=otherMark;
				$("#"+this.id).html(otherMark);
			}
			if(hasAI && detectEmptySpots().length>0 && !detectWinner()) makeAImove();
			if(!detectWinner() && detectEmptySpots().length==0) declareDraw();
		}
	});
	$("#startgame").click(function(){
		gameOngoing=true;
		player1turn=(Math.floor(Math.random()*2)<1);
		content=["","","","","","","","",""];
		$("td").html("");
		$("#result").html("");
		$("#startgame").html("Restart");
    chosenMark=$("#chosenmark").find(":selected").text();
    otherMark=($("#chosenmark").find(":selected").text()=="X")?"O":"X";
		if(hasAI&&!player1turn) makeAImove();
	});
});

function detectEmptySpots(){
	var emptySpots=[];
	for(var ctr=0;ctr<9;ctr++){
		if(content[ctr]=="") emptySpots.push(ctr);
	}
	return (emptySpots);
}

function makeAImove(){
	var chosenSpot = detectEmptySpots()[Math.floor(detectEmptySpots().length*Math.random())];
	$("#cell"+chosenSpot).append(otherMark);
	content[chosenSpot]=otherMark;
	player1turn=true;
}

function declareDraw(){
	gameIsOver();
	$("#result").html("Draw");
}

function detectWinner(){
	if(content[0]==content[1]&&content[1]==content[2]&&content[0]!="") return declareWinner(content[0]);
	else if(content[3]==content[4]&&content[4]==content[5]&&content[3]!="") return declareWinner(content[3]);
	else if(content[6]==content[7]&&content[7]==content[8]&&content[6]!="") return declareWinner(content[6]);
	else if(content[0]==content[3]&&content[3]==content[6]&&content[0]!="") return declareWinner(content[0]);
	else if(content[1]==content[4]&&content[4]==content[7]&&content[1]!="") return declareWinner(content[1]);
	else if(content[2]==content[5]&&content[5]==content[8]&&content[2]!="") return declareWinner(content[2]);
	else if(content[0]==content[4]&&content[4]==content[8]&&content[0]!="") return declareWinner(content[0]);
	else if(content[2]==content[4]&&content[4]==content[6]&&content[2]!="") return declareWinner(content[2]);
	else return false;
}

function gameIsOver(){
	$("#startgame").html("Play again");
	gameOngoing=false;
}

function declareWinner(winnerID){
	gameIsOver();
	$("#result").html((winnerID==chosenMark)?"Player 1 wins":"Player 2 wins");
	return true;
}