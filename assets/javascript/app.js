//defining onclick functions that run in the window
window.onload = function() {
  $("#start-button").on("click", stopwatch.start);
  $(".choice").on("click", stopwatch.rightCount);
  $("#done-button").on("click", stopwatch.stop);
  $("#restart-button").on("click", stopwatch.reset);
};

//variables
var intervalId;
var clockRunning = false;
var rightAnswers = 0;

// timer
var stopwatch = {
  time: 30,

  // check answers
  rightCount: function() {
    if (clockRunning) {
      var selection = $(this)
        .val()
        .trim();
      if (selection === "right" && rightAnswers < 7) {
        rightAnswers++;
      }

      // user wins
      else if (rightAnswers > 7) {
        stopwatch.stop();
      }
    }

    // don't start until timer is on
    else if (!clockRunning) {
      event.preventDefault();
    }
  },

  // play again
  reset: function() {
    stopwatch.stop();
    stopwatch.time = 60;
    rightAnswers = 0;
    $("#time-remaining").text("1:00");
    $("input[type='radio']").prop("checked", false);
  },

  // start countdown
  start: function() {
    if (!clockRunning) {
      intervalId = setInterval(stopwatch.count, 1000);
      clockRunning = true;
    }
  },

  // stop countdown
  stop: function() {
    clearInterval(intervalId);
    clockRunning = false;

    // shows final score
    $("#time-remaining").html("Score:" + rightAnswers + "/7");
  },

  // timer for countdown
  count: function() {
    //as long as there is still time left on the clock, keep counting down
    if (stopwatch.time > 0) {
      stopwatch.time--;
      var converted = stopwatch.timeConverter(stopwatch.time);

      //time remaining
      $("#time-remaining").text(converted);
    }

    // stop countdown when time is done
    else {
      stopwatch.stop();
    }
  },

  // time in minutes and seconds
  timeConverter: function(t) {
    var minutes = Math.floor(t / 60);
    var seconds = t - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    if (minutes === 0) {
      minutes = "00";
    } else if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return minutes + ":" + seconds;
  }
};
