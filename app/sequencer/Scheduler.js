const SCHEDULE_FREQUENCY = 2; // times per second

export default class Scheduler {


  constructor(audioAPI, callback) {

    this._audioAPI = audioAPI;
    this._callback = callback;
    this._eventQueue = [];

    this._latency = 0.05; // latency in ms
    this._running = false;

  }

  start() {
    this._deltaT = 1000.0 / SCHEDULE_FREQUENCY;

    // startTime stores the audioContext time in which the scheduler is started
    // to calculate time in events coordinate system substract startTime
    this._startTime = this._audioAPI.getCurrentTime() + this._latency;
    this._audioTime = this._startTime;

    this._lastTime = this._startTime;
    this._running = true;

    this._schedulerHandle = setInterval(this.scheduleEvents.bind(this), this._deltaT);
  }

  stop() {
    if (this._running) {
      this._running = false;
      clearInterval(this._schedulerHandle);
    }
  }

  setTime(newTime) {
    if (!this._running) {
      this._audioTime = newTime;
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
    this._audioTime = this._audioAPI.getCurrentTime();
    const now = this._audioTime - this._startTime;

    console.log('Audio time:\t\t' + this._audioTime);
    console.log('Scheduler time:\t\t' + now);

    this._eventQueue
      .filter((event) => {
        return (event.time >= now && event.time <= now + this._deltaT / 1000.0);
      })
      .map((event) => {
        this._callback({
          sample: event.sample,
          time: event.time + this._startTime
        });
      });

  }

  // add single event or array of events to queue
  addToQueue(events) {
    const eventsArray = [].concat(events);
    eventsArray.map((event) => {
      this._eventQueue.push(event);
    });
  }

  // delete all events in queue
  clearQueue() {
    this.eventQueue = [];
  }

}