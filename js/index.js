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
	if(matchPattern(0,1,2)) return declareWinner(content[0]);
	else if(matchPattern(3,4,5)) return declareWinner(content[3]);
	else if(matchPattern(6,7,8)) return declareWinner(content[6]);
	else if(matchPattern(0,3,6)) return declareWinner(content[0]);
	else if(matchPattern(1,4,7)) return declareWinner(content[1]);
	else if(matchPattern(2,5,8)) return declareWinner(content[2]);
	else if(matchPattern(0,4,8)) return declareWinner(content[0]);
	else if(matchPattern(2,4,6)) return declareWinner(content[2]);
	else return false;
}

function matchPattern(tile1, tile2, tile3){
  if (content[tile1]=="") return false; //avoid matching empty tiles
  return (content[tile1] == content[tile2] && content[tile2] == content[tile3]);
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
