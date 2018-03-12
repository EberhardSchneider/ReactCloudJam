const SCHEDULE_FREQUENCY = 10; // times per second

export default class Scheduler {


  constructor(audioAPI, callback) {

    this._audioAPI = audioAPI;
    this._eventQueue = [];

    this._latency = 50; // latency in ms
    this._running = false;

  }

  start() {
    this._deltaT = 500.0;

    // startTime stores the audioContext time in which the scheduler is started
    // to calculate time in events coordinate system substract startTime
    this._startTime = this._audioAPI.getCurrentTime();
    this._audioTime = 0.0;

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

    // this._eventQueue
    //   .filter((event) => {
    //     return (event.timestamp >= now && event.timestamp <= now + this._deltaT);
    //   })
    //   .map((event) => {
    //     this.callback(event);
    //   });

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