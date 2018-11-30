/* WE need to generate gameplay in the id="game" section of our html file.
To achieve this we need to generate the game board alignment, cards and numbers,
render them to the playing field and we also need to incorporate a matching
of the cards and test them out.
Game will be won once all the cards are flipped over.
 */
/*-----------------------------------------------------------------------------
------------------------------------------------------------------------------*/

 /*Generate the Gameboard of the id="game" section of our hmtl file*/
var MatchGame = {};

/* This var MatchGame is what will generate a 4*4 card gameplay */

$(document).ready(function(){
  var $game = $('#game'); /*Reference the id attribute game as a bookmark*/
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
});

/* Here we used Jquery to refer to the important values. we have a variable $game
referencing the id attribute of the hmtl file $('#game');.
We also give the var values the value of MatchGame.generateCardValues();.
From there we end this code with the MatchGame.renderCards(values,$game);
This will act as the anchor and provide the cards in form of value number at the
location of the html document*/

/*-----------------------------------------------------------------------------
-------------------------------------------------------------------------------
-----------------------------------------------------------------------------*/

/*Let us create a function to generateCardValues for the gameplay*/

MatchGame.generateCardValues = function(){
  var sequentialValues = []; /* Create the numbers in an array*/
  for (var value = 1; value <= 8; value++){
    sequentialValues.push(value);
    sequentialValues.push(value);}

    /* This for loop will loop through the values of 1 to 8 in an array of ordered
    numbers but each number will be pushed twice for a total of 16 entries of
    values 1 to 8 */

    var cardValues= []; /* Create an array to place random numbers on the respective cards*/

    while(sequentialValues.length > 0){
      var randomIndex = Math.floor(Math.random() * sequentialValues.length);
      var randomValue = sequentialValues.splice(randomIndex, 1)[0];
      cardValues.push(randomValue);
    }

    /* the while loop will start the randomization. We first want to randomize
    the index and this can be done with the length of the previous array. the
    formula Math.floor(Math.random() * sequentialValues.length) will give the
    value of random index to range from 0 to 15.

    Next we will represent a rndom value from the sequentialValues array by
    taking the random index of that array and splicing one entry of that array.
    this first splicing will represent the first entry of the cardValues.

    Next we push it in to the cardValues array to fill it up. */

    return cardValues;
  };

/*-----------------------------------------------------------------------------
-------------------------------------------------------------------------------
-----------------------------------------------------------------------------*/

/*Next we will need to render the cards to the playing field and give styling */

MatchGame.renderCards = function(cardValues, $game){

  /*Let us select the colors of the cards in an array*/
    var colors = [ 'hsl(25,85%,65%)', 'hsl(55,85%,65%)', 'hsl(90,85%,65%)',
  'hsl(160,85%,65%)', 'hsl(220,85%,65%)', 'hsl(265,85%,65%)', 'hsl(310,85%,65%)',
'hsl(360,85%,65%)'];

$game.empty(); /* Empty the game */

$game.data('flippedCards', []);
/* Add game data once flipped and have a blank array to reflect the flipped cards */

for(var valueIndex = 0; valueIndex < cardValues.length; valueIndex++){
  var value = cardValues[valueIndex];
  var color = colors[value - 1];
  var data = {
    value:value, color:color, isFlipped:false};

    var $cardElement = $('<div class="col-xs-3 card"></div>');
    $cardElement.data(data);
    $game.append($cardElement);
  }

  /*This will render the cardValues array to the cards.
  Keep in mind the cardValues are all random and each have their own indeces. Here
  we are taking these values and making card indeces array. Meaning we are referring to
  the indeces of cardValues and Cards indeces as two seperate entities but working
  to combine the values into one render.

   This for loop will give three
  aspects of data, color and value to the cards. value is set to the cardValues with
  valueIndex accordingly. color is set to the array of colors but the value of the number will
  be different with vaule -1. this is to have the card color and value color be different.

  The data section. Takes value to value, color to color and isFlipped is False as we set
  it not to be Flipped. Data is being set while the cards are pending the flipping.

  Let us Fill in the cardElement of the game. Using Bootstrap styling it takes the
  card as its own column size of xs 3 out of 12.

  Next the card element takes data dn references the data. In the for loop it will
  take the values of the cards not yet flipped.

  Lastly the Card Element is appended to gameplay and the for loop goes through each
  of the cards to get all card indeces filled with data. */

  $('.card').click(function(){
    MatchGame.flipCard($(this), $('#game'));
  });

  /*Next we refernce this .card element and place it in the place of the id attribute
  with the result that the MatchGame has flipped over the card. */
};


/*-----------------------------------------------------------------------------
-------------------------------------------------------------------------------
-----------------------------------------------------------------------------*/


/* Next we go into detail of when we flip over the cards. */


MatchGame.flipCard = function($card, $game) {
if ($card.data('isFlipped')) {return;}
$card.css('background-color', $card.data('color'))
.text($card.data('value'))
.data('isFlipped', true);

/* Basic properties to be set when we flip over a card*/

var flippedCards = $game.data('flippedCards');
flippedCards.push($card);
if (flippedCards.length === 2) {
     if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
        var matchCss = {
            backgroundColor: 'rgb(153, 153, 153)',
            color: 'rgb(204, 204, 204)'};
        flippedCards[0].css(matchCss); /*Keep color if it holds true*/
        flippedCards[1].css(matchCss);
      }

      /*Set a variable called FlippedCards and set to the jQuery code of .data FlippedCards.
      From there we push it to reveal card.
      Next we set condiditions to see the revealed cards and put them an array as seen in the previous function
      $game.data('flippedCards', []);
      when pushing the card value it will get placed in the array.
      Now we set the condiditions: when flipping two cards it will hit the length of 2
      making us refer to the first condition. From here we will see if the indeces of these two
      are the same.
      flippedCards[0].data('value')=== flippedCards[1].data('value') if this is the case.
      We will have the colors change and fit accordingly and keep them as is*/

      else {
          var card1 = flippedCards[0];
          var card2 = flippedCards[1];
          window.setTimeout(function() {
                card1.css('background-color', 'maroon')
                .text('')
                .data('isFlipped', false);
                card2.css('background-color', 'maroon')
                .text('')
                .data('isFlipped', false);
              },350);
            }
     $game.data('flippedCards', []);
  }
};

/* Here the else statement will make the colors hold as they currently are. Then
we set the setTimeout function to change the card back to normal as it originally was
with text being blank '' and the background color that of original. But each of these
 cards will retain the same value as in they wont keep changing so if we click them they
 will remain in the same place until they are matched with the correct cards. Meaning that the
 it gets treated as the orginal design in .data('isFlipped', false), this all will happen
 with the milliseconds of 350 only if the cards do not match.*/
