//select container
var container = document.getElementById("container");

//create rowDiv inside container
var rowAmount = 5;
for (var i = 0; i < rowAmount; i++) {
  var rowDiv = document.createElement("div");
  rowDiv.setAttribute("id", "row"+i);
  container.appendChild(rowDiv);
}

// backside image of the card
var backSideImage = './images/back.png';

//create rowDiv which contains the rows
var rowDiv = container.children;
var colList = [];
//create colDiv inside rowDiv
var colAmount = 4;
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
    colDiv.style.paddingTop = width;
    colDiv.style.backgroundImage = `url(${backSideImage})`;
    colDiv.style.backgroundSize = 'contain';
    rowDiv[i].appendChild(colDiv);
  }
}

//collection of colors
var colors = [
  "Red", "Green", "Blue", "Yellow", "Purple", "Orange", "Gold", "DeepPink",
  "Brown", "Lavender"];

//collection of images
var images = [];
var pickedIndices = [];
var amountOfPicked = 0;
while (pickedIndices.length < 10) {
  var index = Math.floor(Math.random() * 10);
  if (pickedIndices.indexOf(index) < 0) {
    pickedIndices.push(index);
    var image = {
      name: `front${index}.png`,
      count: 0,
    };
    images.push(image);
  }
}

console.log('images ', images);

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
for (var m = 0; m < rowAmount; m++) {
  for (var n = 0; n < colAmount; n++) {
    var id = "col "+ m + "-" + n;
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

    cards.push(new card(id, color, selectedImage.name));
  }
}

console.log('cards ',cards);

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
  console.log('openedImages ', openedImages);
	var finalImage = "";
	if (openedImages[0] === openedImages[1]) {
		checkImageMatch = true;
	} else {
		finalImage = backSideImage;
		checkImageMatch = false;
	}
	return finalImage;
}

//function to turn the card
function flip(elem) {
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
			// elem.style.background = color;
      elem.style.backgroundImage = `url('./images/${image}')`;
      elem.style.backgroundSize = `contain`;
		  }
	  }
    }
  }
}

//function to check if all cards are paired
function finished() {
  var falseAmount = 0;
  for (var i in cards) {
    if (cards[i].paired === false) {
	  falseAmount += 1
	}
  }
  // console.log("False amount: " + falseAmount);
  if (falseAmount > 0) {
    return false;
  } else {
    return true;
  }
}

//function to create new button
var buttonContainer = document.getElementById("buttonContainer");
function newButton() {
  var buttonOr = document.createElement("p");
  var orText = document.createTextNode("or");
  buttonOr.appendChild(orText);
  buttonContainer.appendChild(buttonOr);

  var buttonHard = document.createElement("button");
  var goHardText = document.createTextNode("It was Too Hard");
  buttonHard.appendChild(goHardText);
  buttonHard.setAttribute("class", "btn");
  buttonHard.addEventListener("click", function() {
    window.location = "colorMemoryNormal.html";
  });
  buttonContainer.appendChild(buttonHard);
}

//function for the game after it finishes
function postFinished() {
  if (finished()) {
	  container.style.display = "none";
	  var messagePar = document.createElement("p");
	  var messageText = document.createTextNode("All colors have been paired!");
	  messagePar.appendChild(messageText);
	  message.appendChild(messagePar);
	  // newButton();
  }
}

//function to flip the opened cards based on color check
function flipAgain(cardToCheck) {
	if (opened === 2) {
		// var color = checkColor(openedColor);
    // console.log('color ', color);
    var image = checkImage(openedImages);
    console.log('image ', image);
		var card1 = document.getElementById(cardToCheck[0]);
		var card2 = document.getElementById(cardToCheck[1]);
    if (image.length > 0) {
      card1.style.backgroundImage = `url(${backSideImage})`;
      card1.style.backgroundSize = `contain`;
      card2.style.backgroundImage = `url(${backSideImage})`;
      card2.style.backgroundSize = `contain`;
    } else {
      card1.style.background = 'inherit';
  		card2.style.background = 'inherit';
    }
		//turn the cards paired status to true if the cards match
		//console.log("match check: " + checkMatch);
		if (checkImageMatch) {
			for (var i in cards) {
				for (var j in cardToCheck) {
					if (cards[i].id === cardToCheck[j]) {
						cards[i].paired = true;
					}
				}
			}
      var color = 'White';
      card1.style.background = color;
  		card2.style.background = color;
			card1.style.borderColor = color;
			card2.style.borderColor = color;
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
for (var k = 0; k < rowAmount; k++) {
  for (var l = 0; l < colAmount; l++) {
    var id = "col "+k+"-"+l;
    var col = document.getElementById(id);
    col.addEventListener("click", function() {
      flip(this);
      if (openedCard.length === 2 ){
        setTimeout(function() {flipAgain(openedCard)}, 1500);
      }
    });
  }
}


//restart function for the button, refreshes the page
function restart() {
	location.reload();
}
