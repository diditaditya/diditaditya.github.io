//variables
var moreCards = 4;
var lessCards = 3;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var rowAmount = moreCards;
var colAmount = lessCards;
var doesWin = false;

//create new styleSheets for the card sides
var cardSideStyle = document.createElement("style");
cardSideStyle.appendChild(document.createTextNode(""));
document.head.appendChild(cardSideStyle);
var cardStyleSheet = cardSideStyle.sheet;

//select container
var container = document.getElementById("container");

//set body height based on windowHeight
function setBodyHeight() {
  windowHeight = window.innerHeight;
  let body = document.getElementsByTagName('body');
  body[0].style.height = `900px`;
  console.log(windowHeight);
}

//function to check width and height, and set row and col
function setColAndRowAmounts() {
  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;
  if (windowWidth > windowHeight) {
    rowAmount = lessCards;
    colAmount = moreCards;
  } else {
    rowAmount = moreCards;
    colAmount = lessCards;
  }
  // console.log(windowHeight);
}

//create rowDiv inside container
function createRow(rowAmount) {
  for (var i = 0; i < rowAmount; i++) {
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("id", "row"+i);
    rowDiv.style.perpective = "1000px";
    rowDiv.style.position = "relative";
    container.appendChild(rowDiv);
  }
}

// backside image of the card
var backSideImage = './images/back.jpg';

//create colDiv inside rowDiv which contains the rows
var colList = [];
function createCol(colAmount) {
  var rowDiv = container.children;
  for (var i = 0; i < rowAmount; i++) {
    for (var j = 0; j < colAmount; j++) {

      var colDiv = document.createElement("div");
      colDiv.setAttribute("class", "cardHard");
      var id = "col "+i+"-"+j;
      colDiv.setAttribute("id", id);

      var margin = 1;

      var width = `${((100-(margin*(colAmount*2)))/colAmount)}%`;
      colDiv.style.margin =`${margin}%`;
      colDiv.style.width = width;

      var cardDivBack = document.createElement("div");

      cardDivBack.setAttribute("class", "cardBack");
      cardDivBack.setAttribute("id", `card-${i}-${j}`);


      colDiv.appendChild(cardDivBack);
      rowDiv[i].appendChild(colDiv);
    }
  }
}

//collection of colors
var colors = [
  "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gold", "DeepPink",
  "Brown", "Lavender"];

//function to create collection of images
var images = [];
function createImageCollection(rowAmount, colAmount) {
  var imageAmount = (rowAmount * colAmount) / 2;
  var pickedIndices = [];
  var amountOfPicked = 0;
  while (pickedIndices.length < imageAmount) {
    var index = Math.floor(Math.random() * (imageAmount + 1));
    if (pickedIndices.indexOf(index) < 0) {
      pickedIndices.push(index);
      var image = {
        name: `front${index}.jpg`,
        count: 0,
      };
      images.push(image);
    }
  }
  // console.log(images);
}

//create object constructor for the color
var colorObj = function(name) {
  this.name = name;
  this.count = 0;
}

//create object constructor for the card
var card = function(id, color, image) {
  this.id = id;
  this.color = color;
  this.image = image;
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

//function to create list of images which counts are less than 2
function limitImages(images) {
  var newImageList = [];
  images.map((image) => {
    if (image.count < 2) {
      newImageList.push(image);
    }
  });
  return newImageList;
}

//function to randomly choose color from the color array
function randomColor(array) {
  var color = array[Math.floor(Math.random()*array.length)];
  return color;
}

//function to randomly choose image from the image array
function randomImage(images) {
  var index = Math.floor(Math.random() * images.length);
  var image = images[index];
  return image;
}

//assign names and colors to card objects
var cards = [];
function assignCards(rowAmount, colAmount) {
  let styleCount = 0;

  if (cardStyleSheet.cssRules.length > 0) {
    for (let i = 0; i < cardStyleSheet.cssRules.length; i++) {
      cardStyleSheet.deleteRule(i);
    }
  }

  for (var m = 0; m < rowAmount; m++) {
    for (var n = 0; n < colAmount; n++) {
      var id = "col "+ m + "-" + n;
      var cardId = `card-${m}-${n}`;
      var color = randomColor(limitColor(colors));
      var selectedImage = randomImage(limitImages(images));

      for (var i in colorList) {
        if (colorList[i].name === color) {
          colorList[i].count += 1;
        }
      }

      images.map((image) => {
        if (image.name === selectedImage.name) {
          image.count ++;
        }
      });

      let newCard = new card(id, color, selectedImage.name);
      let col = document.getElementById(newCard.id);
      let frontSideCard = document.createElement('div');
      frontSideCard.setAttribute("id", `${cardId}-b`);
      frontSideCard.setAttribute("class", "cardFront");

      if (cardStyleSheet.cssRules[styleCount]) {
        cardStyleSheet.cssRules[styleCount].selectorText = `#${cardId}-b`;
        cardStyleSheet.cssRules[styleCount].style.backgroundImage = `url(./images/cards-colored/${newCard.image})`;
      } else {
        if (cardStyleSheet.addRule) {
          cardStyleSheet.addRule(`#${cardId}-b`,
            `
              background-image: url(./images/cards-colored/${newCard.image});
            `,
            styleCount);
        } else {
          frontSideCard.style.backgroundImage = `url(./images/cards-colored/${newCard.image})`;
        }
      }
      styleCount ++;
      col.appendChild(frontSideCard);

      cards.push(newCard);
    }
  }
  styleCount = 0;
  // console.log(cards);
  // console.log(document.styleSheets);
  // console.log(cardStyleSheet);
}


//function to count the flipped card, max 2 cards is allowed
var opened = 0;
var openedCard = [];
var openedColor = [];
var openedImages = [];
function checkOpen(card, color, image) {
	if (opened < 2) {
		if (card !== openedCard[0]) {
			opened +=1 ;
			openedCard.push(card);
			openedColor.push(color);
      openedImages.push(image);
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

//function to check the images of flipped cards
var checkImageMatch = false;
function checkImage(openedImages) {
	var finalImage = "";
	if (openedImages[0] === openedImages[1]) {
		checkImageMatch = true;
    score = score + 10;
	} else {
		finalImage = backSideImage;
		checkImageMatch = false;
    if (score > 0) {
      score = score - 1;
    }
	}
  updateScore();
	return finalImage;
}

//function to turn the card
function flip(elem) {
  startCount();
  if (opened < 2) {
    for (var n in cards) {
  	  var id = elem.id;
  	  var color = "";
      var image = "";
  	  if (cards[n].id === id) {
  		  //check whether the card is already paired
  		  if (!cards[n].paired) {
  			//if the card is not paired yet, do the flip
  			for (var i in cards) {
  				if (cards[i].id === id) {
  					color = cards[i].color;
            image = cards[i].image;
  				}
  			}
  			checkOpen(id, color, image);
  		  }
  	  }
    }
  }
}

//function to check if all cards are paired
function areAllPaired() {
  var falseAmount = 0;
  for (var i in cards) {
    if (cards[i].paired === false) {
	     falseAmount += 1
	    }
  }
  if (falseAmount > 0) {
    return false;
  } else {
    return true;
  }
}

//function to check if game is finished
function finished() {
  if (areAllPaired() && !isGameOver) {
    stopCount();
    doesWin = true;
    return true;
  } else {
    return false;
  }
}

//function to create new button
var buttonContainer = document.getElementById("buttonContainer");
function newButton() {
  var buttonOr = document.createElement("p");
  var orText = document.createTextNode("or choose the difficulty");
  buttonOr.appendChild(orText);
  buttonContainer.appendChild(buttonOr);

  var buttonEasy = document.createElement("button");
  var goEasyText = document.createTextNode("Easy");
  buttonEasy.appendChild(goEasyText);
  buttonEasy.setAttribute("class", "btn");
  buttonEasy.addEventListener("click", function() {
    newGameEasy()
  });

  // var buttonMedium = document.createElement("button");
  // var goMediumText = document.createTextNode("Medium");
  // buttonMedium.appendChild(goMediumText);
  // buttonMedium.setAttribute("class", "btn");
  // buttonMedium.addEventListener("click", function() {
  //   newGameMedium()
  // });

  var buttonHard = document.createElement("button");
  var goHardText = document.createTextNode("Hard");
  buttonHard.appendChild(goHardText);
  buttonHard.setAttribute("class", "btn");
  buttonHard.addEventListener("click", function() {
    newGameHard()
  });

  buttonContainer.appendChild(buttonEasy);
  // buttonContainer.appendChild(buttonMedium);
  buttonContainer.appendChild(buttonHard);
  // buttonContainer.style.marginBottom = "34%";

  document.getElementById('right-filler').style.marginLeft = "25%";
  document.getElementById('right-filler').style.width = "50%";
  document.getElementById('right-filler').style.paddingTop = "0";
}

//function for the game after it finishes because they are all paired
function postFinished() {
  if (finished()) {
    stopCount();
    score = score + counter;
    updateScore();
	  container.style.display = "none";
	  var messagePar = document.createElement("p");
	  var messageText = document.createTextNode("You Won! All have been paired!");
	  messagePar.appendChild(messageText);
	  message.appendChild(messagePar);
    newButton();
  }
}

//function to flip the opened cards based on color check
function flipAgain(cardToCheck) {
	if (opened === 2) {
		// var color = checkColor(openedColor);
    var image = checkImage(openedImages);
		var card1 = document.getElementById(cardToCheck[0]);
		var card2 = document.getElementById(cardToCheck[1]);

		//turn the cards paired status to true if the cards match
		if (checkImageMatch) {
			for (var i in cards) {
				for (var j in cardToCheck) {
					if (cards[i].id === cardToCheck[j]) {
						cards[i].paired = true;
					}
				}
			}
      var color = 'rgba(255, 255, 255, 0)';

      var card1Front = card1.childNodes[1];
      card1Front.style.backgroundImage = '';
      card1Front.style.background = color;
      card1Front.style.borderColor = color;

      var card2Front = card2.childNodes[1];
      card2Front.style.backgroundImage = '';
      card2Front.style.background = color;
      card2Front.style.borderColor = color;
		} else {
      card1.classList.toggle('flipped');
      card2.classList.toggle('flipped');
    }
		//reset the variables which capture the opened cards
		opened = 0;
		openedCard = [];
		openedColor = [];
    openedImages = [];
		//finished check and run the post-finish event if true
		postFinished();
	}
}

//add event listener to the cards
function createCardListeners() {
  cards.map((card) => {
    let id = card.id;
    let col = document.getElementById(id);
    col.addEventListener("click", function() {
      if (openedCard.indexOf(id) === -1 && openedCard.length < 2) {
        if (!card.paired) {
          this.classList.toggle('flipped');
        }
      }
      flip(this);
      if (openedCard.length === 2 ){
        setTimeout(function() {flipAgain(openedCard)}, 750);
      }
    });
  });
}

//clear the page and reset the game variables
function clear() {

  document.getElementById('right-filler').style.marginLeft = "";

  while (container.lastChild) {
    container.removeChild(container.lastChild);
  }

  if (message.children.length > 0) {
    message.removeChild(message.lastChild);
  }

  while (buttonContainer.children.length > 1) {
    buttonContainer.removeChild(buttonContainer.lastChild);
  }

  colList = [];
  images = [];
  cards = [];

  opened = 0;
  openedCard = [];
  openedColor = [];
  openedImages = [];

  isTimed = false;
  isTimeUp = false;
  isGameOver = false;

  resetTimerAndScore();
}

//restart function for the button, refreshes the page
function restart() {
  stopCount();
  clear();
  container.style.display = "inherit";
  document.getElementById('right-filler').style.width = "25%";
  document.getElementById('right-filler').style.paddingTop = "11.5%";
  game();
}

//create the main game function
function game() {
  // setBodyHeight();
  initScoreAndTimer();
  setColAndRowAmounts();
  createRow(rowAmount);
  createCol(colAmount);
  createImageCollection(rowAmount, colAmount);
  assignCards(rowAmount, colAmount);
  createCardListeners();
}

//new game easy
function newGameEasy() {
  lessCards = 3;
  moreCards = 4;
  restart();
}

// //new game medium
// function newGameMedium() {
//   lessCards = 4;
//   moreCards = 4;
//   restart();
// }

//new game hard
function newGameHard() {
  lessCards = 4;
  moreCards = 5;
  restart();
}
