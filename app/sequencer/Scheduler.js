const SCHEDULE_FREQUENCY = 10; // times per second
const SCHEDULE_LOOKAHEAD = 200; // in ms

export default class Scheduler {


  constructor(audioContext, callback) {

    this.context = audioContext;
    this.eventQueue = [];

    this.bpm = 120;
    this.latency = 50; // latency in ms
    this.running = false;

  }

  start(startBeat) {
    this.deltaT = 1000.0 / SCHEDULE_FREQUENCY;
    this.startTime = this.context.currentTime + this.latency;
    this.lastTime = this.startTime;
    this._running = true;

    this._schedulerHandle = setInterval(this.scheduleEvents.bind(this), this.SCHEDULE_FREQUENCY);
  }

  stop() {
    if (this._running) {
      this._running = false;
      clearInterval(this._schedulerHandle);
    }
  }

  setTime(newTime) {
    if (!this._running) {
      this.currentTime = newTime;
      this.lastTime = newTime;
    } else {
      this.currentTime = newTime;
    }
  }

  isRunning() {
    return this._running;
  }

  setScheduleFrequency(freq) {
    this.SCHEDULE_FREQUENCY = freq;
  }

  getScheduleFrequency() {
      return this.SCHEDULE_FREQUENCY;
    }

    <<
    << << < HEAD: app / sequencer / Scheduler.js
  scheduleEvents(callback) {
    if (this.eventQueue.length == 0)
      return;
    const currentTime = this.context.currentTime;

    while (this.eventQueue[0].timestamp < this.lastTime + SCHEDULE_LOOKAHEAD) {
      callback(this.eventQueue[0]);
      delete(this.eventQueue[0]);
    }

    this.lastTime = currentTime;
    setTimeout(this.scheduleEvents.bind(this, callback), this.deltaT); ===
    === =
    scheduleEvents() {
      const now = this.currentTime;

      this.eventQueue
        .filter((event) => {
          return (event.timestamp >= now && event.timestamp <= now + this.deltaT);
        })
        .map((event) => {
          this.callback(event);
        });

      this.currentTime += this.deltaT; >>>
      >>> > 8425 c57b30b9c1dc580275115208bf4424604dde: app / player / Scheduler.js
    }

    // add single event or array of events to queue
    addToQueue(events) {
      const eventsArray = [].concat(events);
      eventsArray.map((event) => {
        this.eventQueue.push(event);
      });
    }

    // delete all events in queue
    clearQueue() {
      this.eventQueue = [];
    }

  }