let content=Array(9).fill(""), player1turn=true, gameOngoing=false, chosenMark="X", otherMark="O", hasAI = true;

const gameResult = document.getElementById("result");
const gameStarter = document.getElementById("startgame");
const mark = document.getElementById("chosenmark");
const tiles = document.getElementsByTagName("TD");

gameStarter.addEventListener("click", () => {
  hasAI = document.querySelector('input[name="playercount"]:checked').value == "1p";
  gameOngoing = true;
  player1turn = (Math.floor(Math.random()*2)<1);
  content = Array(9).fill("");
  Array.from(tiles, tile => tile.innerHTML = "");
  gameResult.innerHTML = "";
  gameStarter.innerHTML = "Restart";
  chosenMark = mark.value;
  otherMark = mark.value=="X" ? "O" : "X";
  if(hasAI&&!player1turn) makeAImove();
})

let claimTile = function(){
  const chosenSpot = parseInt(this.id.charAt(4));
  if(content[chosenSpot]==""&&gameOngoing){
    document.getElementById(this.id).innerHTML = player1turn ? chosenMark : otherMark;
    content[chosenSpot] = player1turn ? chosenMark : otherMark;
    if(player1turn){
      if(!hasAI) player1turn=false;
    }
		else player1turn=true;
		
    const emptySpots = countBlanks();
    if(hasAI && emptySpots.length>0 && !detectWinner()) makeAImove();
    if(!detectWinner() && emptySpots.length==0) declareDraw();
  }
}

Array.from(tiles, tile => tile.addEventListener("click", claimTile));

function countBlanks(){
	let spots=[];
	for(let ctr=0;ctr<9;ctr++){
		if(content[ctr]=="") spots.push(ctr);
	}
	return (spots);
}

function makeAImove(){
  const emptySpots = countBlanks();
	const chosenSpot = emptySpots[Math.floor(emptySpots.length*Math.random())];
  document.getElementById(`cell${chosenSpot}`).innerHTML = otherMark;
	content[chosenSpot] = otherMark;
	player1turn=true;
}

function declareDraw(){
	gameIsOver();
  gameResult.innerHTML = "Draw";
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
  gameStarter.innerHTML = "Play again";
	gameOngoing=false;
}

function declareWinner(winnerID){
	gameIsOver();
  gameResult.innerHTML = `Player ${winnerID==chosenMark ? "1" : "2"} wins`;
	return true;
}
