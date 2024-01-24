var colours = ["colour1", "colour2", "colour3", "colour4"];
var sequence = []; 
var seqIndex = 0;

var started = false;

var level = 0;

/* Start Game by Keypress */
$(document).keypress(function() {
    if (started === true) return;

    nextColour();

    started = true;
});

/* Play Game through Clicks */
$(".btn").click(function() {
    if (started === false) return;

    var clickedColour = this.id;
    animatePress(clickedColour);

    if (clickedColour === sequence[seqIndex]) {
        seqIndex++;

        if (seqIndex === sequence.length) {
            nextColour();
    
            seqIndex = 0;
        }
    } else {
        restart();
    }
});


function nextColour() {
    var randIndex = Math.floor(Math.random() * 4);
    var randColour = colours[randIndex];
    $("#" + randColour).fadeOut().fadeIn();
    new Audio("./sounds/" + randColour + ".mp3").play();
    sequence.push(randColour);

    $("#level-title").text("Level " + level).css('color', 'white');
    level++;
}

function animatePress(colour) {
    $('#' + colour).addClass("pressed");
    setTimeout(function() {
        $('#' + colour).removeClass("pressed");
    }, 100);
    new Audio("./sounds/" + colour + ".mp3").play();
}

function restart() {
    $("#level-title").text("Game Over. Press any Key to Start.").css('color', 'red');
    sequence = [];
    seqIndex = 0;
    level = 0;
    started = false;
}