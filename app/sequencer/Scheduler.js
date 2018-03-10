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
    this.running = true;

    this.scheduleEvents.bind(this)();
  }

  scheduleEvents(callback) {
    if (this.eventQueue.length == 0)
      return;
    const currentTime = this.context.currentTime;

    while (this.eventQueue[0].timestamp < this.lastTime + SCHEDULE_LOOKAHEAD) {
      callback(this.eventQueue[0]);
      delete(this.eventQueue[0]);
    }

    this.lastTime = currentTime;
    setTimeout(this.scheduleEvents.bind(this, callback), this.deltaT);
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