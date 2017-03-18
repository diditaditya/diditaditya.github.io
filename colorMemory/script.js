//select container
var container = document.getElementById("container");

//create rowDiv inside container
var rowAmount = 4;
for (var i = 0; i < rowAmount; i++) {
  var rowDiv = document.createElement("div");
  rowDiv.setAttribute("id", "row"+i);
  container.appendChild(rowDiv);
}

//create rowDiv which contains the rows
var rowDiv = container.children;
var colList = [];
//create colDiv inside rowDiv
var colAmount = 3;
for (var i = 0; i < rowAmount; i++) {
  for (var j = 0; j < colAmount; j++) {
    var colDiv = document.createElement("div");
    colDiv.setAttribute("class", "col");
    var id = "col "+i+"-"+j;
    colDiv.setAttribute("id", id);
    rowDiv[i].appendChild(colDiv);
  }
}

//collection of colors
var colors = ["Red", "Green", "Blue", "Yellow", "Purple", "Orange"];
//create object constructor for the color
var colorObj = function(name) {
  this.name = name;
  this.count = 0;
}

//create object constructor for the card
var card = function(id, color) {
  this.id = id;
  this.color = color;
  this.paired = false;
}

//list of color objects
var colorList = [];
for (var i in colors) {
  colorList[i] = new colorObj(colors[i]);
}

//function to limit the color choices so only max 2 counts per color
function limitColor(array) {
	var newColorList = [];
    for (var i in array) {
		for (var j in colorList) {
			if (array[i] === colorList[j].name) {
				var count = colorList[j].count;
				if (count < 2) {
					newColorList.push(colorList[j].name);
				}
			}	    
	    }
    }
    return newColorList;
}

//function to randomly choose colors from the color array
function randomColor(array) {
  var color = array[Math.floor(Math.random()*array.length)];
  return color;
}

//assign names and colors to card objects
var cards = [];
for (var m = 0; m < rowAmount; m++) {
  for (var n = 0; n < colAmount; n++) {
    var id = "col "+ m + "-" + n;
    var color = randomColor(limitColor(colors));
    for (var i in colorList) {
      if (colorList[i].name === color) {
        colorList[i].count += 1;
      }
    }
    cards.push(new card(id, color));
  }
}

//print the objects to the console
//console.log(cards);
//console.log(colorList);

//function to count the flipped card, max 2 cards is allowed
var opened = 0;
var openedCard = [];
var openedColor = [];
function checkOpen(card, color) {
	if (opened < 2) {
		if (card !== openedCard[0]) {
			opened +=1 ;
			openedCard.push(card);
			openedColor.push(color);	
		}
	} 
}

//function to check the colors of flipped cards
var checkMatch = false;
function checkColor(openedColor) {
	var finalColor = "";
	if (openedColor[0] === openedColor[1]) {
		finalColor = "White";
		checkMatch = true;
	} else {
		finalColor = "Gray";
		checkMatch = false;
	}
	return finalColor;
}

//function to flip the opened cards based on color check
function flipAgain(cardToCheck) {
	if (opened === 2) {
		color = checkColor(openedColor);
		var card1 = document.getElementById(cardToCheck[0]);
		var card2 = document.getElementById(cardToCheck[1]);
		card1.style.background = color;
		card2.style.background = color;
		//turn the cards paired status to true if the cards match
		//console.log("match check: " + checkMatch);
		if (checkMatch) {
			for (var i in cards) {
				for (var j in cardToCheck) {
					if (cards[i].id === cardToCheck[j]) {
						cards[i].paired = true;
					}
				}
			}
			card1.style.borderColor = color;
			card2.style.borderColor = color;
		}
		//reset the variables which capture the opened cards
		opened = 0;
		openedCard = [];
		openedColor = [];
	}
}

//function to turn the card
function flip(elem) { 
  for (var n in cards) {
	  var id = elem.id;
	  var color = "";
	  if (cards[n].id === id) {
		  //check whether the card is already paired
		  if (!cards[n].paired) {
			//if the card is not paired yet, do the flip
			for (var i in cards) {
				if (cards[i].id === id) {
					color = cards[i].color;
				}
			}
			checkOpen(id, color);
			//console.log(opened);
			//console.log(openedCard);
			//console.log(openedColor);
			//console.log(cards);
			elem.style.background = color;			  
		  }
	  }
  }
}

//add event listener to the cols
for (var k = 0; k < rowAmount; k++) {
  for (var l = 0; l < colAmount; l++) {
    var id = "col "+k+"-"+l;
    var col = document.getElementById(id);
    col.addEventListener("click", function() {
      flip(this);
      setTimeout(function() {flipAgain(openedCard)}, 750);
    });
  }
}

//restart function for the button, refreshes the page
function restart() {
	location.reload();
}
