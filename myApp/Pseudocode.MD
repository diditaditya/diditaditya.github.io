Make 'object' which contains keys of 1, 2, 3 and properties of 'Rock', 'Paper', 'Scissors' respectively 
and the addresses for image source accordingly.

Make variables 'player hand value', 'computer hand value', 'player win count', 'computer win count' and set them to 0.
Make variable 'winner' as empty string. 
Make variables 'player hand image', 'computer hand image', 'message', 'computer hand message', 'player score', 'computer score' 
from the corresponding HTML elements.

Create 3 separate function for each 'rock' 'paper' 'scissors' button,
	change the 'player hand image' address according to the clicked button
	change to 'message' to shout which button is pressed
	change the 'player hand value' to 0 if 'rock', 1 if 'paper', and '2' if scissors.

Create 'random' function to randomly pick computer's hand,
	make 'random' variable which generates random number from 0 to 2,
	change 'computer hand value' to 'random',
	change the 'computer hand image' address to the properties in 'object' based on 'random',
	change the 'computer hand message' to shout which hand has randomly picked.

Create 'check who wins' function, the function has 2 input parameters which are 'player hand value' and 'computer hand value',
	if 'player hand value' is 0 or 'rock',
		if 'computer hand value' is 1 or 'paper' then
			add 1 to 'computer win count',
			save 'COMPUTER WINS!' to 'winner'.
		if 'computer hand value' is 2 or 'scissors' then
			add 1 to 'player win count',
			save 'YOU WIN!' to 'winner'.
		else save 'NOBODY WINS!' to 'winner'.
	if 'player hand value' is 1 or 'paper',
		if 'computer hand value' is 2 or 'scissors' then
			add 1 to 'computer win count',
			save 'COMPUTER WINS!' to 'winner'.
		if 'computer hand value' is 0 or 'rock' then
			add 1 to 'player win count',
			save 'YOU WIN!' to 'winner'.
		else save 'NOBODY WINS!' to 'winner'.
	if 'player hand value' is 2 or 'scissors',
		if 'computer hand value' is 1 or 'paper' then
			add 1 to 'computer win count',
			save 'COMPUTER WINS!' to 'winner'.
		if 'computer hand value' is 0 or 'rock' then
			add 1 to 'player win count',
			save 'YOU WIN!' to 'winner'.
		else save 'NOBODY WINS!' to 'winner'.

Create function which is called when 'Run' button is pressed,
	call 'random' function,
	call 'check who wins' function,
	update the player score by changing 'player score' with 'player win count',
	update the computer score by changing 'computer score' with 'computer win count'.