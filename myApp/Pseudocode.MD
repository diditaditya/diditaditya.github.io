##ROCK PAPER SCISSORS PSEUDOCODE

<p>Make <b>object</b> which contains keys of 0, 1, 2 and properties of <i>Rock</i>, <i>Paper</i>, <i>Scissors</i> respectively and the addresses for image source accordingly.</p>

<p>Make variables <b>player hand value, computer hand value, player win count</b>, and <b>computer win count</b> and set them to 0.</p>

<p>Make variable <b>winner</b> as empty string.</p>

<p>Make variables <b>player hand image, computer hand image, message, computer hand message, player score</b>, and <b>computer score</b> from the corresponding HTML elements.</p>

<p>Create 3 separate function for each <b>rock paper scissors</b> button,
 <ul>
  <li>change the <b>player hand image</b> address according to the clicked button</li>
	<li>change the <b>message</b> to shout which button is pressed</li>
	<li>change the <b>player hand value</b> to 0 if <b>rock</b>, 1 if <b>paper</b>, and 2 if <b>scissors</b>.</li>
 </ul>
</p>

<p>Create <b>random</b> function to randomly pick computer's hand,
 <ul>
  <li>make <b>random</b> variable which generates random number from 0 to 2,</li>
	<li>change the value of <b>computer hand value</b> to <b>random</b> variable value,
	<li>change the <b>computer hand image</b> address to the properties in <b>object</b> based on <b>random</b> variable value,
	<li>change the <b>computer hand message</b> to shout which hand has randomly picked.
 </ul>
</p>

<p>Create <b>check who wins</b> function, the function has 2 input parameters which are <b>player hand value</b> and <b>computer hand value</b>,  
 <ul>
  <li>if <b>player hand value</b> is 0 or <i>rock</i>,
	 <ul>
	  <li>if <b>computer hand value</b> is 1 or <i>paper</i> then
		 <ul>
		  <li>add 1 to <b>computer win count</b>,</li>
 		  <li>save "COMPUTER WINS!" to <b>winner</b>.</li>
		 </ul>
		</li>
		<li>if <b>computer hand value</b> is 2 or <i>scissors</i> then
		 <ul>
		  <li>add 1 to <b>player win count</b>,</li>
		  <li>save "YOU WIN!" to <b>winner</b>.</li>
		 </ul>
		</li>
		<li>else save "NOBODY WINS!" to <b>winner</b>.</li>
	 </ul>
	</li>
	<li>if <b>player hand value</b> is 1 or <i>paper</i>,
	 <ul>
	  <li>if <b>computer hand value</b> is 2 or <i>scissors</i> then
		 <ul>
		  <li>add 1 to <b>computer win count</b>,</li>
			<li>save "COMPUTER WINS!" to <b>winner</b>.</li>
		 </ul>
		</li>
		<li>if <b>computer hand value</b> is 0 or <i>rock</i> then
		 <ul>
		  <li>add 1 to <b>player win count</b>,</li>
			<li>save "YOU WIN!" to <b>winner</b>.</li>
		 </ul>
		</li>
		<li>else save "NOBODY WINS!" to <b>winner</b>.</li>
	 </ul>
	</li>
	<li>if <b>player hand value</b> is 2 or <i>scissors</i>,
	 <ul>
	  <li>if <b>computer hand value</b> is 1 or <i>paper</i> then
		 <ul>
		  <li>add 1 to <b>computer win count</b>,</li>
			<li>save "COMPUTER WINS!" to <b>winner</b>.</li>
		 </ul>
		</li>
		<li>if <b>computer hand value</b> is 0 or <i>rock</i> then
		 <ul>
		  <li>add 1 to <b>player win count</b>,</li>
			<li>save "YOU WIN!" to <b>winner</b>.</li>
		 </ul>
		</li>
		<li>else save "NOBODY WINS!" to <b>winner</b>.</li>
	 </ul>
	</li>
 </ul>
</p>

<p>Create function which is called when <b>Run</b> button is pressed,
 <ul>
  <li>call <b>random</b> function,</li>
	<li>call <b>check who wins</b> function,</li>
	<li>update the player score by changing <b>player score</b> content with <b>player win count</b>,</li>
	<li>update the computer score by changing <b>computer score</b> content with <b>computer win count</b>.</li>
 </ul>
</p>
