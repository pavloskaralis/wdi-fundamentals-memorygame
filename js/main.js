var cards = [
{
	rank: "queen",
	suit: "hearts",
	cardImage: "images/queen-of-hearts.png"
},
{
	rank: "queen",
	suit: "diamonds",
	cardImage: "images/queen-of-diamonds.png"
},
{
	rank: "king",
	suit: "hearts",
	cardImage: "images/king-of-hearts.png"
},
{
	rank: "king",
	suit: "diamonds",
	cardImage: "images/king-of-diamonds.png"
}
];

function show() {												//reveals and hides instructions
	var instructions = document.querySelector("#instructions");
	instructions.classList.toggle("show");
	instructions.classList.toggle("hide");
}

function shuffle(array) {										//randomly generates card placement
    var currentIndex = array.length;							//accomdates for Math.floor round down
    while (0 !== currentIndex) {								//until no index remains	
      randomIndex = Math.floor(Math.random() * currentIndex); 	//select random index
      currentIndex -= 1;										//adjust back to index values and cycle down
      temporaryValue = array[currentIndex];						//house current index to avoid being overwritten
      array[currentIndex] = array[randomIndex];					//first half of swap
      array[randomIndex] = temporaryValue;						//second half of swap
    }													
    return array;		
  };
shuffle(cards);

function createBoard() {
	for (var i = 0; i < cards.length; i++) {
		var cardElement = document.createElement("img");
		cardElement.setAttribute("src", "images/back.png");
		cardElement.setAttribute("data-indexvalue", i);
		cardElement.setAttribute("data-rank", cards[i].rank);
		cardElement.addEventListener("click", flipCard);
		document.getElementById("game-board").appendChild(cardElement);
	}
};
createBoard();

function reset() {													//reloads all but instruction visibility after winning or clicking shuffle
	document.getElementById("game-board").innerHTML = '';			//prevents duplicate set of cards from spawning
	document.getElementById("win").setAttribute("class","hide");	//hides winning message	
	cardsInPlay.splice(0, 2); 										//removes all elements from cardsInPlay[]								
	shuffle(cards);													//randomly generates card placement
	createBoard();													
};

function endGame() {													//initiates after matcheing card found
	document.getElementById("win").setAttribute("class","show");		//reveals winning message
	setTimeout(reset, 1200);											//allows winning message to show before game ends
};

function unFlipCard() {																						//initiates after unmatching card found
	document.querySelectorAll("img").forEach(flipBack => flipBack.setAttribute("src", "images/back.png"));	//sets all card images to backside
	document.querySelectorAll("img").forEach(clickOn => clickOn.setAttribute("class", " "));				//enables cards to be clicked again	
	cardsInPlay.splice(0, 2); 																				//removes all elements from cardsInPlay[]
};

var cardsInPlay = [];
function checkForMatch(){
	if (cardsInPlay[0] === cardsInPlay[1]) {
	setTimeout(endGame, 200);								//allows more time for matching card to show before winning message appears
	} else {
	setTimeout(unFlipCard, 700);							//allows for unmatching card to show before flipping to backside
	}
};

function flipCard() {
	var cardIndexValue = this.getAttribute("data-indexvalue");
	var cardRank = this.getAttribute("data-rank");				//pushes rank to cardsInPlay[] allowing for checkForMatch()
	this.setAttribute("src", cards[cardIndexValue].cardImage);
	this.setAttribute("class", "noclick");						//prevents flipped card from being reclicked into cardsInPlay[]
	cardsInPlay.push(cardRank);
	if (cardsInPlay.length === 2) {
	document.querySelectorAll("img").forEach(clickOff => clickOff.setAttribute("class", "noclick")) //allows only 2 cards to show at a time
	checkForMatch();
	}
};



