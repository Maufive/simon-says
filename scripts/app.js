//Defining variables, hooking up html elements
const displayScore = document.querySelector('.displayScore');
const blueButton = document.querySelector('.blueButton');
const redButton = document.querySelector('.redButton');
const greenButton = document.querySelector('.greenButton');
const yellowButton = document.querySelector('.yellowButton');
const notification = document.querySelector('.notification');
const checkbox = document.querySelector('.check');

var game = {
  count: 0,
  round: 0,
  maxRound: 20,
  //Array to store the randomized pattern in
  gameSequence: [],
  //Array for the current round, and one for the players input
  currentSequence: [],
  playerSequence: [],
  playerTurn: false,
  speed: 1200,
  mode: 'Normal'
}

function init() {
  game.playerTurn = false;
  game.gameSequence = [];
  game.currentSequence = [];
  game.playerSequence = [];
  game.round = 0;
  game.count = 0;
  displayScore.textContent = "0 / 20 ";
}
//Initializing a new game, resetting everything to 0.
function newGame() {
  game.playerTurn = false;
  game.gameSequence = [];
  game.currentSequence = [];
  game.playerSequence = [];
  game.round = 0;
  game.count = 0;
  displayScore.textContent = "0 / 20 ";
  //Calling two functions to start the game.
  //First one is creating an array of 20 randomized numbers,
  //and the second one shows the sequence.
  createSequence();
  showSequence();
}

//Creating a array of 20 random numbers between 0-3.
function createSequence() {
  game.gameSequence = [];
  for (var i = 0; i < game.maxRound; i++) {
    addToSequence();
  }
  return game.gameSequence;
}
//Randomizing a number between 0-3 (0 index) and pushing it to the gamesequence
//array. The function will be called 20 times from the function above
//Incrementing the round property by 1. (First round)
function addToSequence() {
  let n = Math.floor((Math.random() * 4));
  game.gameSequence.push(n);
  // game.count++;
  showSequence();
}

function showSequence() {
  game.playerTurn = false;  //Not players turn, game showing the sequence
  var i = 0;
  var sequenceLoop = setInterval(function(){
    highlightButton(game.gameSequence[i]);
    i++;
    if(i >= game.count + 1) {
      clearInterval(sequenceLoop);
      game.currentSequence = game.gameSequence.slice(0, game.count + 1);
      game.playerSequence = [];
      game.playerTurn = true;
    }
  }, game.speed);
}
//Adding the highlight class to the button and plays the correct sound
//also removes the class after 0.3s.
function highlightButton(btnNumber) {
  var sound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound' + (btnNumber + 1) + '.mp3');
  document.getElementById("btn" + btnNumber).classList.add('highlight');
  setTimeout(function() {
    document.getElementById("btn" + btnNumber).classList.remove('highlight');
  }, 300);
  sound.play();
}
//When you click a button, it will check if its your turn, if so, call the
//highlightButton function and push your button-value to the player array.
function clickBtn(btnNumber) {
  if(game.playerTurn === true) {
    highlightButton(btnNumber);
    game.playerSequence.push(btnNumber);
    testSequence();
  }
}
checkbox.addEventListener('click', function(e){
  if (checkbox.value === 'on'){
    checkbox.value = 'off';
    game.mode = 'Normal';
    notification.textContent = 'Hardmode OFF';
  } else {
    checkbox.value = 'on'
    game.mode = 'Hard';
    notification.textContent = 'Hardmode ON';
  }
  notification.style.background = 'none';
});

//This function will check if the players array will match the current array
//If the player has the wrong answers, the player will be notified and gets
//another chance
function testSequence() {
  for (var i = 0; i < game.playerSequence.length; i++) {
    //If the user is wrong do this
    if (game.playerSequence[i] != game.currentSequence[i]) {
      notification.innerHTML = 'Wrong input <i class="fa fa-times"></i>';
      notification.style.background = '#CC333F';
      game.playerTurn === false;
      // showSequence();
      if (game.mode == 'Normal') {
        return showSequence();
      } else {
        notification.textContent = 'GAME OVER';
        return init();
      }
    }
  }
  //If the user is right, do this
  if (game.playerSequence.length === game.currentSequence.length) {
    notification.innerHTML = 'Correct <i class="fa fa-check"></i>';
    notification.style.background = '#88C100';
    game.playerTurn = false;
    game.playerSequence = [];
    game.count++;
    updateCount();
    checkWin();
    return showSequence();
  }
}

function updateCount() {
  displayScore.textContent = game.count + " / 20";
}

redButton.addEventListener('click', function(e){
  clickBtn(0);
});
blueButton.addEventListener('click', function(e){
  clickBtn(1);
});
yellowButton.addEventListener('click', function(e){
  clickBtn(2);
});
greenButton.addEventListener('click', function(e){
  clickBtn(3)
})

function checkWin() {
  if (game.count >= 21) {
    notification.textContent = 'YOU WON!';
    notification.style.background = '#88C100';
  }
}

/* I am presented with a random series of button presses.(DONE)


/* Each time I input a series of button presses correctly,
I see the same series of button presses but
with an additional step.(DONE)

I hear a sound that corresponds to each button
both when the series of button presses plays, and
when I personally press a button.(DONE)

If I press the wrong button, I am notified that
I have done so, and that series of button presses
starts again to remind me of the pattern so I can
try again.(DONE)

I can see how many steps are in the current
series of button presses.(DONE)

If I want to restart, I can hit a button to do so,
game will return to a single step.(DONE)

I can play in strict mode where if I get a button
press wrong, it notifies me that I have done so,
and the game restarts at a new random series of button
presses.(DONE)

TO DO:


I can win the game by getting a series of 20 steps
correct. I am notified of my victory, then the game
starts over.()
*/
