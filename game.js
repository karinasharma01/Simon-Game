var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//This variable started keeps a track of whether the game has started or not so as to ensure that nextSequence() gets 
//called only on the first keypress.It toggles to true once game starts and if it's true then further key presses should 
//not trigger the next sequence.
var started = false;
var level = 0;

//Detecting keyboard press
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});
//This detects when any of the buttons are clicked and triggers a handler function.
$(".btn").click(function() {

  //The variable userChosenColour stores the id of the button that got clicked by the user.
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  //console.log(userClickedPattern);

  playSound(userChosenColour);

  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel) {

    //It is used to check if the most recent user answer is the same as the game pattern.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //If the user got the most recent answer right, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else
    {

      console.log("wrong");
      //The sound gets played when the user gets any of the answers wrong
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }


}

function nextSequence()
{

  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);


  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);
}
//Function to play the sound when a button gets clicked
function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {

  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColour).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//Function to restart/reset the game if the person selects the wrong colour
function startOver()
{
  level=0;
  gamePattern=[];
  started=false;
}