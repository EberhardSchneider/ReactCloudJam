import AudioAPI from './Audio.js';
import Scheduler from './Scheduler';

export default class Sequencer {

  constructor() {
    this._audioAPI = new AudioAPI();
    this._scheduler = new Scheduler(this._audioAPI, this.scheduleCallback);

    this._pattern = [];
    this._events = [];
  }

  setPattern(pattern) {
    this._pattern = pattern;
    this._eventsBeat = [];
    this._pattern.map((beat, beatIndex) => {
      beat.map((sample, sampleIndex) => {
        if (sample != 0) {
          this._eventsBeat.push({
            sample: sampleIndex,
            time: beatIndex
          });
        }
      });
    });
    console.log('Events beat');
    console.log(this._eventsBeat);
    this._eventsTime = this.convertEventsToTime(this._eventsBeat);
    console.log('Events time');
    console.log(this._eventsTime);
  }

  addSample(filename) {
    this._audioAPI.addSampleFromFilename(filename);
  }

  setHead() {}

  play() {
    this._scheduler.addToQueue(this._eventsTime);
    this._scheduler.start();
  }

  stop() {
    this._scheduler.stop();
  }

  addEvent() {}

  deleteEvent() {}

  scheduleCallback(event) {
    console.log('Scheduling:');
    console.log(event);
    if (!event.time) return;
    this._audioAPI.scheduleSample(event.sample, event.timestamp);
    // }
    //
    // fillSchedulerQueue() {
    //   this._scheduler.clearQueue();
    //   this._pattern.map((beat, beatIndex) => {
    //     beat.map((sampleIndex) => {
    //       if (sampleIndex != 0) {
    //         this.scheduler.addToQueue({
    //           sample: sampleIndex,
    //           time: this.beatToTime(beatIndex)
    //         });
    //       }
    //     });
    //   });
  }

  convertBeatsToTime(beat, startBeat = 1, bpm = 240) {
    if (bpm == 0)
      throw new Error('divByZero: cannnot handle tempo of 0 bpm.');
    const deltaBeat = beat - startBeat;
    const newTime = deltaBeat / bpm * 60;

    return newTime;
  }

  convertEventsToTime(eventsArray, startBeat = 1, bpm = 120) {

    if (bpm == 0)
      throw new Error('divByZero: cannnot handle tempo of 0 bpm.');
    const converted = eventsArray.map((event) => {
      event.time = this.convertBeatsToTime(event.time, startBeat, bpm);
      return event;
    });

    return converted;
  }

}