class Audio {
  constructor() {
    this._audioContext = new AudioContext();
  }

  playBuffer(buffer, time) {
    const audioNode = this._audioContext.createBufferSourceNode();
    audioNode.buffer = buffer;
    audioNode.start(time);
  }
}