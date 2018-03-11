export default class Sequencer {
  // INTERFACE

  // head position in beats
  // tempo in bpm
  // audioContext here or in Scheduler????
  // events: [{ track, pos, velocity }]
  // audio API: Scheduler, context, playSound

  setHead() {}

  play() {}

  stop() {}

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