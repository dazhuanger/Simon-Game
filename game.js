// An array that contains 4 colors
var buttonColors = ["red", "blue", "green", "yellow"];

// 2 arrays to store game patterns and user clicked pattern repectively
var gamePattern = [];
var userClickedPattern = [];

// Set a toggle to control the start of game with a boolean value.
var started = false;
var level = 0;

// Function to detect key press to start the game.
$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Function to detect mouse clicks and store the value into the array.
$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

// Check the answer by comparing user clicked patterns and game patterns.
function checkAnswer(currentLevel) {

  // Check the last element in the array see if they match.
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    // After checking the last item, check the length of 2 arrays and see if they match.
    if (userClickedPattern.length === gamePattern.length) {

      setTimeout(function() {
        nextSequence();
      }, 1000);

    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// Next sequence function
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}


function playSound(input) {
  var audio = new Audio("sounds/" + input + ".mp3");
  audio.play();
}

function animatePress(currenColor) {
  $("#" + currenColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currenColor).removeClass("pressed");
  }, 100);
}

// Start over Function
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
