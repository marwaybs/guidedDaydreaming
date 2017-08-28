var totalReps = 1; //Repitions of BLS
var rep = 0; //Current rep
var maxTime = 6; //max time of each rep
var minTime = 8; //minimum time of each rep
var wanderTextList = ["Where are you now?", "Is there another way to see it?"] //text appearing between each BLS rep



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
  //Apply class before changing the css class
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


function fade(){
  var wanderText = $('#wanderText'),
  newone = wanderText.clone(true);
  wanderText.before(newone);
  wanderText.remove();
};

function blsRep(){
  // basecase for session finished
  if (rep >= totalReps){
    ahoy.track("Session is finished");
    setTimeout(function(){
      $("#wanderText").text("Session is finished");
      $("#finished").css("display","block");
      $("#wanderText").addClass("fadeIn");
      $("#finished").addClass("fadeIn");
    }, 3000);

  }else{
    var time = Math.random() * (maxTime - minTime) + minTime;
    time = 2 * Math.round(time / 2); //time needs to be even for animation to work correctly

    console.log(time);
    restartAnimation("fast", time);

    setTimeout(function(){
      $("#wanderText").text(wanderTextList[Math.floor(Math.random()*wanderTextList.length)]);
      fade();

    }, (time+3)*1000);

    setTimeout(function(){
      rep++
      blsRep();
    }, (time+6)*1000);
  }
}

$(function() {
  $('#bls').addClass('blsAnimation');
  blsRep();
})
