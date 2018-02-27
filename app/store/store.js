import Player from '../player/SamplePlayer';

class Store {
  constructor(data) {
    const initialData = data || {
      nTracks: 4,
      length: 16
    };

    const samples = [
      '../../samples/01.wav',
      '../../samples/04.wav',
      '../../samples/06.wav',
      '../../samples/07.wav'
    ];

    this.player = new Player(samples);

    this.data = {
      nTracks: initialData.nTracks,
      length: initialData.length,
      pattern: Array(initialData.length).fill(Array(initialData.nTracks).fill(0)),
      samples: samples,
      playPosition: 0, // in ms
      playing: false,
    };

    this.listeners = [];

    this.listenerId = 0;
  }


  setState(newState) {
    const mergedState = {
      ...this.data,
      ...newState
    };
    this.data = mergedState;
    //
    // if (this.data.playing) {
    //   this.startTick();
    // } else {
    //   this.stopTick();
    // }

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