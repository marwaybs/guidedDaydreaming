ahoy.trackAll();

var totalReps = 5; //Repitions of BLS
var rep = 0; //Current rep
var maxTime = 35; //max time of each rep
var minTime = 20; //minimum time of each rep
var wanderTextList = ["Where are you now?", //text appearing between each BLS rep
                      "Is there another way to see it?",
                      "Is this a productive thought?",
                      "How could this be different?",
                      "Dig deeper",
                      "What physical sensation are you noticing?",
                      "What emotion are you feeling?",
                      "What is an earlier time you felt similarly?",
                      "How could it have been different?",
                      "Go back to the initial memory.",
                      "Try daydreaming faster.",
                      "Try daydreaming to other places.",
                      "Try daydreaming to an earlier time.",
                      "Try daydreaming slower.",
                      "What conversation does it remind you of?",
                      "Which person comes to mind?",
                      "What are you avoiding thinking about?",
                      "Who do you want to talk to?",
                      "How could things feel different?",
                      "Change how your body is responding.",
                    ]


function updateSlowAnimation(time){
  sideToSideIteration = (Math.ceil((time-2)/4))*2;
  sideToSideTime = 2*sideToSideIteration
  sideToSideDelay = 2 + sideToSideTime;
  fadeOutDelay = sideToSideDelay + 2
  //Apply class before changing the css class
  iterString = "1, 1, "+sideToSideIteration+", 1, 1"
  delayString = "0s, 1s, 2s, "+sideToSideDelay+"s, "+fadeOutDelay+"s";
  // console.log(iterString, delayString);
  $(".blsAnimation").css({"animation-iteration-count": iterString,"animation-duration": "1s, 1s, 2s, 2s, 1s","animation-delay": delayString});
}


function updateFastAnimation(time) {
  sideToSideIteration = (Math.ceil((time-3)/4))*4;
  sideToSideTime = sideToSideIteration
  sideToSideDelay = 1.5 + sideToSideTime;
  fadeOutDelay = sideToSideDelay + 2
  //Apply class before changing the css class to adjust the animation
  iterString = "1, 1, "+sideToSideIteration+", 1, 1"
  delayString = "0s, 1s, 1500ms, "+sideToSideDelay+"s, "+fadeOutDelay+"s";
  // console.log(iterString, delayString);
  $(".blsAnimation").css({"animation-iteration-count": iterString,"animation-duration": "1s, 500ms, 1s, 1s, 1s","animation-delay": delayString});
}

function restartAnimation(speed, time) {
  if (speed == "slow"){
    updateSlowAnimation(time);
  }else{
    updateFastAnimation(time);
  }
  var circle = $('#bls'),
  newone = circle.clone(true);
  circle.before(newone);
  circle.remove();
};

// to re-use animation need to clone, delete original instance and then animate the clone
function fade(){
  var wanderText = $('#wanderText'),
  newone = wanderText.clone(true);
  wanderText.before(newone);
  wanderText.remove();
};

function blsRep(){
  // basecase for session finished
  if (rep >= totalReps){
    ahoy.track("Session is finished"); //counts how many sessions have been finished
    setTimeout(function(){
      $("#wanderText").text("Session is finished");
      $("#finished").css("display","block");
      $("#wanderText").addClass("fadeIn");
      $("#finished").addClass("fadeIn");
    }, 2000);

  }else{
    var time = Math.random() * (maxTime - minTime) + minTime;
    time = 2 * Math.round(time / 2); //time needs to be even for animation to work correctly
    console.log(time);
    restartAnimation("fast", time);

    setTimeout(function(){ //timeout for wandertext to appear between bls sets
      $("#wanderText").text(wanderTextList[Math.floor(Math.random()*wanderTextList.length)]);
      fade();
    }, (time+3)*1000);

    setTimeout(function(){ //timeout for bls to restart
      rep++
      blsRep();
    }, (time+6)*1000);
  }
}

$(function() { //class needs to be applied to bls ball.
  $('#bls').addClass('blsAnimation');
  blsRep();
})

function showPostSubmitText(){
  $("#postSubmitText").css("display","block");
  $("#postSubmitText").addClass("fadeIn");
}

//for star ratings
// target element
var el = document.querySelector('#el');

// current rating, or initial rating
var currentRating = 0;

// max rating, i.e. number of stars you want
var maxRating= 5;

// callback to run after setting the rating
var callback = function(rating) { alert(rating); };

// rating instance
var myRating = rating(el, currentRating, maxRating, callback);
