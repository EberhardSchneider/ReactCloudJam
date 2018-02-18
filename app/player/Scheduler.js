export default class Scheduler {


  constructor(audioContext, callback) {
    const SCHEDULE_FREQUENCY = 500;
    this.context = audioContext;
    this.eventQueue = [];
    this.bpm = 120;
    this.latency = 50; // latency in ms
    this.running = false;
  }

  start(startBeat, bpm = 120) {
    this.deltaT = this.SCHEDULE_FREQUENCY;
    this.startTime = this.context.currentTime + this.latency;
    this.lastTime = this.startTime;
    this.running = true;

    this.scheduleEvents.bind(this)();
  }

  scheduleEvents() {
    const currentTime = this.context.currentTime;

    while (this.eventQueue[0].timestamp < this.lastTime + 2 * this.deltaT) {
      callback(this.eventQueue[0]);
      delete(this.eventQueue[0]);
    };

    this.lastTime = currentTime;
    setTimeout(this.scheduleEvents.bind(this), this.deltaT - error);
  }

  // add single event or array of events to queue
  addToQueue(events) {
    // check if single event or array
    // add events
    // sort queue
  }

  // delete all events in queue
  clearQueue() {

  }

}