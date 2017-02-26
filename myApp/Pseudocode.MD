###ROCK PAPER SCISSORS PSEUDOCODE

<p>Make **object** which contains keys of 1, 2, 3 and properties of _Rock_, _Paper_, _Scissors_ respectively
and the addresses for image source accordingly.</p>

<p>Make variables **player hand value**, **computer hand value**, **player win count**, **computer win count** and set them to 0.</p>

<p>Make variable **winner** as empty string.</p>  

<p>Make variables **player hand image**, **computer hand image**, **message**, **computer hand message**, **player score**, **computer score** from the corresponding HTML elements.</p>

<p>Create 3 separate function for each **rock** **paper** **scissors** button,
 <ul>
  <li>change the **player hand image** address according to the clicked button</li>
	<li>change to **message** to shout which button is pressed</li>
	<li>change the **player hand value** to 0 if **rock**, 1 if **paper**, and 2 if **scissors**.</li>
 </ul>
</p>

Create **random** function to randomly pick computer's hand,  
	* make **random** variable which generates random number from 0 to 2,
	* change value of **computer hand value** to **random**,
	* change the **computer hand image** address to the properties in **object** based on **random** variable value,
	* change the **computer hand message** to shout which hand has randomly picked.

Create **check who wins** function, the function has 2 input parameters which are **player hand value** and **computer hand value**,  
	* if **player hand value** is 0 or _rock_,
	 * if **computer hand value** is 1 or _paper_ then
	  * add 1 to **computer win count**,
		* save "COMPUTER WINS!" to **winner**.
	 * if **computer hand value** is 2 or _scissors_ then
	  * add 1 to **player win count**,
		* save "YOU WIN!" to **winner**.
	 * else save "NOBODY WINS!" to **winner**.
	* if **player hand value** is 1 or _paper_,
	 * if **computer hand value** is 2 or _scissors_ then
	  * add 1 to **computer win count**,
		* save "COMPUTER WINS!" to **winner**.
	 * if **computer hand value** is 0 or _rock_ then
	  * add 1 to **player win count**,
		* save "YOU WIN!" to **winner**.
	 * else save "NOBODY WINS!" to **winner**.
	* if **player hand value** is 2 or _scissors_,
	 * if **computer hand value** is 1 or _paper_ then
	  * add 1 to **computer win count**,
		* save "COMPUTER WINS!" to **winner**.
	 * if **computer hand value** is 0 or _rock_ then
	  * add 1 to **player win count**,
		* save "YOU WIN!" to **winner**.
	 * else save "NOBODY WINS!" to **winner**.

Create function which is called when **Run** button is pressed,  
	* call **random** function,
	* call **check who wins** function,
	* update the player score by changing **player score** content with **player win count**,
	* update the computer score by changing **computer score** content with **computer win count**.
