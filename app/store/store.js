const TICK_INTERVAL = 100;


class Store {



  constructor(data) {

    const initialData = data || {
      nTracks: 4,
      length: 16
    };

    this.data = {
      nTracks: initialData.nTracks,
      length: initialData.length,
      pattern: Array(initialData.nTracks).fill(Array(initialData.length).fill(0)),
      samples: Array(initialData.nTracks).fill(''),
      playPosition: 0,
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

    if (this.data.playing) {
      this.startTick();
    } else {
      this.stopTick();
    }

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

  startTick = () => {
    if (!this.tickId)
      this.tickId = setInterval(this.tick.bind(this), TICK_INTERVAL);

  }

  stopTick = () => {
    if (this.tickId) {
      clearInterval(this.tickId);
      this.tickId = undefined;
    }
  }

  tick() {
    let {
      playPosition
    } = this.data;
    playPosition += 1;
    playPosition %= this.data.length;
    this.setState({
      playPosition
    });
  }

  triggerListeners() {
    this.listeners.map(listener => listener());
  }

}

export default Store;