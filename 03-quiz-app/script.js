class Timer {
  constructor() {
    this.isRunning = false;
    this.startTime = 0;
    this.overallTime = 0;
    this.countdownDuration = 25 * 60 * 1000; // 25 minutes in milliseconds
  }

  _getTimeElapsedSinceLastStart() {
    if (!this.startTime) {
      return 0;
    }

    return Date.now() - this.startTime;
  }

  start() {
    if (this.isRunning) {
      return console.error('Timer is already running');
    }

    this.isRunning = true;

    this.startTime = Date.now();
  }

  stop() {
    if (!this.isRunning) {
      return console.error('Timer is already stopped');
    }

    this.isRunning = false;

    this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
  }

  reset() {
    this.overallTime = 0;

    if (this.isRunning) {
      this.startTime = Date.now();
      return;
    }

    this.startTime = 0;
  }

  getTime() {
    if (!this.startTime) {
      return '25:00';
    }

    const remainingTimeInSeconds = Math.max(
      (this.countdownDuration -
        this.overallTime -
        this._getTimeElapsedSinceLastStart()) /
        1000,
      0
    );
    const minutes = Math.floor(remainingTimeInSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(remainingTimeInSeconds % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  }
}

const timer = new Timer();
timer.start();
setInterval(() => {
  document.getElementById('time').innerText = timer.getTime();
}, 1000);

const choices = document.querySelectorAll('li');

choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    deselectAllChoices();
    choiceSelection(choice);
  });
});

function deselectAllChoices() {
  choices.forEach((choice) => {
    choice.classList.remove('bg-gradient-to-r');
    choice.classList.remove('from-[#3CB4DF]');
    choice.classList.remove('to-[#72E5E7]');
    choice.classList.remove('text-white');
  });
}

function choiceSelection(choice) {
  choice.classList.add('bg-gradient-to-r');
  choice.classList.add('from-[#3CB4DF]');
  choice.classList.add('to-[#72E5E7]');
  choice.classList.add('text-white');
}
