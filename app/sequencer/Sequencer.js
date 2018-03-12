import AudioAPI from './Audio.js';
import Scheduler from './Scheduler';

export default class Sequencer {

  constructor() {
    this._audioAPI = new AudioAPI();
    this._scheduler = new Scheduler(this._audioAPI);
  }

  setHead() {}

  play() {
    this._scheduler.start();
  }

  stop() {
    this._scheduler.stop();
  }

  addEvent() {}

  deleteEvent() {}

  convertBeatsToTime(beat, startTime, startBeat = 1, bpm = 120) {
    if (bpm == 0)
      throw new Error('divByZero: cannnot handle tempo of 0 bpm.');
    const deltaBeat = beat - startBeat;
    const newTime = deltaBeat / bpm * 60 + startTime;

    return newTime;
  }

  convertEventsToTime(eventsArray, startTime, startBeat = 1, bpm = 120) {
    if (bpm == 0)
      throw new Error('divByZero: cannnot handle tempo of 0 bpm.');
    const converted = eventsArray.map((event) => {
      event.time = this.convertBeatsToTime(event.time, startTime, startBeat, bpm);
      return event;
    });

    return converted;
  }
}