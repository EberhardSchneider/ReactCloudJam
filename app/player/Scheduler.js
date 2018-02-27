export default class Scheduler {
  constructor(callback) {

    this.SCHEDULE_FREQUENCY = 100;

    this.eventQueue = [];
    this.callback = callback;

    this.bpm = 120;
    this._running = false;
  }

  start(startTime) {
    this.deltaT = this.SCHEDULE_FREQUENCY;
    this.currentTime = startTime;
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

  scheduleEvents() {
    const now = this.currentTime;

    this.eventQueue
      .filter((event) => {
        return (event.timestamp >= now && event.timestamp <= now + this.deltaT);
      })
      .map((event, index) => {
        delete this.eventQueue[index];
        this.callback(event);
      });

    this.currentTime += this.deltaT;
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