import Sequencer from '../sequencer/Sequencer';

const TICK_INTERVAL = 100;


class Store {
  constructor(data) {
    const initialData = data || {
      nTracks: 4,
      nBeats: 16
    };

    const samples = [
      '../../samples/01.wav',
      '../../samples/04.wav',
      '../../samples/06.wav',
      '../../samples/07.wav'
    ];

    // initialize pattern Array
    let pattern = Array(initialData.nBeats);
    for (let i = 0; i < pattern.length; i++) {
      pattern[i] = Array(initialData.nTracks).fill(0);
    }

    this.data = {
      nTracks: initialData.nTracks,
      nBeats: initialData.nBeats,
      pattern: pattern,
      samples: samples,
      playPosition: 0, // in ms
      playing: false,
    };


    this._sequencer = new Sequencer();

    samples.map((filename) => {
      // this._sequencer.addSampleFromFilename(filename);
    });

    // this._sequencer.setPattern(this.data.pattern);

    this.listeners = [];

    this.listenerId = 0;
  }


  setState(newState) {
    const mergedState = {
      ...this.data,
      ...newState
    };
    this.data = mergedState;

    if (this.data.playing) {
      this._sequencer.play();
    } else {
      this._sequencer.stop();
    }

    // this._sequencer.setPattern(this.data.pattern);

    this.triggerListeners();
  }

  getState() {
    return this.data;
  }

  subscribe(callback) {
    this.listenerId++;
    this.listeners[this.listenerId] = callback;
    return this.listenerId;
  }

  unsubscribe(id) {
    if (this.listners[id]) {
      delete this.listeners[id];
      return true;
    } else {
      return false;
    }
  }

  // startTick = () => {
  //   this.scheduler.start(this.data.playPosition * TICK_INTERVAL);
  // }
  //
  // stopTick = () => {
  //   this.scheduler.stop();
  // }
  //
  // tick() {
  //   let {
  //     playPosition
  //   } = this.data;
  //   playPosition += 1;
  //   playPosition %= this.data.length;
  //   this.setState({
  //     playPosition
  //   });
  //
  // }

  triggerListeners() {
    this.listeners.map(listener => listener());
  }

}

export default Store;