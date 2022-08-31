var gamePattern = []
var userClickedPattern = []
var level = 0
var state = 0
var buttonColours = ["red", "blue", "green", "yellow"]

$("body").keypress(function () {
    if (state == 0) {
        nextSequence()
      } else if (state == 2) {
        startOver()
      }
})

function nextSequence() {
    state = 1
    $("h1").text("level " + level)
        console.log("level " + level)
    
    userClickedPattern = []
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
        console.log(gamePattern)

    $("#"+randomChosenColour).fadeOut(100,audio(randomChosenColour)).fadeIn(100)
    return randomNumber
}
// User Input 
$(".btn").click(clicked)
function clicked(){
    if (state == 1) {
        var userChosenColour = (this.getAttribute("id"))
        animatePress(userChosenColour)
        // $("#"+clickInput).fadeOut(100,audio(userChosenColour)).fadeIn(100)
        userClickedPattern.push(userChosenColour)
                console.log(userClickedPattern)
        checkAnswer()
        return userClickedPattern
    }
}

function checkAnswer(){
    console.log("checking answer")
    
        if (userClickedPattern[userClickedPattern.length-1] == gamePattern[userClickedPattern.length-1]) {
                console.log("correct answer")
            if (gamePattern.length === userClickedPattern.length) {
                console.log("proceed to next level")
                level = level+1
                setTimeout(nextSequence,500)
            }
        } else {
            console.log("wrong answer")
            gameOver()
        }
  }

function gameOver() {
    $("h1").text("Game Over!! Score: " + level + ", Press Any Key to Restart")
    state = 2

    audio("wrong")

    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass("game-over")
    }, 200);
    
    $("h1").fadeOut(1000).fadeIn(1000)
    setInterval(function() { $("h1").fadeOut(1000).fadeIn(1000); }, 3000)
}

function startOver() {
    gamePattern = []
    level = 0
    state = 0

    $("h1").text("Press A Key to Start")
}





// User Audio function
function audio(audioInput){
    var AudioURL = ("sounds/"+audioInput+".mp3");
    var audioOut = new Audio(AudioURL);
    audioOut.play();
}
// User Input Animation
function animatePress(currentColour){
    audio(currentColour)

    $("#"+currentColour).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed")
    }, 100);
}