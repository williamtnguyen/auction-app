/**
 * Countdown Timer frontend boys aff
 */
const countDownTimer = (duration, display) => {
  var start = Date.now(),
      diff,
      minutes,
      seconds;
      function timer() {
        // get the number of seconds that have elapsed since countDownTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        // does the same job as parseInt, truncates the float
        minutes = (diff / 60) | 0;
        seconds = (diff % 60) | 0;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        display.textContent = minutes + ':' + seconds;

        if(diff <= 0) {
          // add one second so that the count down starts at the full duration
          // example 5:00 not 4:59
          start = Date.now() + 1000;
        }
      };
      // don't want to wait a full second before the timer starts
      timer();
      setInterval(timer, 1000);
}

export default countDownTimer;