import Scheduler from '../player/Scheduler';
import axios from 'axios';

const TICK_INTERVAL = 100;
const LATENCY = .1;

export default class Player {
  constructor() {
    console.log(this);
    this.samples = [];

    this.context = new AudioContext();

    this.scheduler = new Scheduler(this.audioSchedulerCallback.bind(this));

    this.currentPlayPosition = 0; // in beats

    this.bpm = 120;

    this.sampleBuffer = [];
  }

  setPattern(pattern) {
    if (pattern.constructor !== Array || pattern[0].constructor !== Array) {
      throw new Error('Player: setPattern needs 2d array');
    }
    this.nBeats = pattern.length;
    this.nTracks = pattern[0].length;
    this.pattern = pattern;
  }

  addSampleFromBuffer(buffer) {
    this.sampleBuffer.push(buffer);
  }

  addSampleFromFilename(filename) {
    axios({
        method: 'get',
        url: filename,
        responseType: 'arraybuffer'
      })
      .then((response) => {
        this.context.decodeAudioData(response.data, (buffer) => {
          this.addSampleFromBuffer(buffer);
        });
      });
  }

  start() {
    if (this._playing)
      return;
    this._playing = true;
    this.startTime = this.context.currentTime + LATENCY;
    this.fillSchedulerQueue();
    this.scheduler.start(this.startTime);
  }

  stop() {
    if (!this._playing)
      return;
    this.scheduler.clearQueue();
    this.scheduler.stop();
    this._playing = false;
  }

  isRunning() {
    return this._playing;
  }

  sync() {
    this.currentTime = this.context.currentTime;
  }

  fillSchedulerQueue() {
    this.scheduler.clearQueue();
    this.pattern.map((beat, beatIndex) => {
      beat.map((sampleIndex) => {
        if (sampleIndex != 0) {
          this.scheduler.addToQueue({
            sample: sampleIndex,
            timestamp: this.beatToTime(beatIndex)
          });
        }
      });
    });
  }

  audioSchedulerCallback(event) {
    console.log('Scheduler callback:');
    console.log(event);
    console.log('Current context time: ' + this.context.currentTime);
    const audioSource = this.context.createBufferSource();
    audioSource.buffer = this.sampleBuffer[event.sample];
    audioSource.connect(this.context.destination);
    audioSource.start(event.timestamp);
  }

  beatToTime(beat) {
    return beat * 60 / this.bpm + this.startTime;
  }

}