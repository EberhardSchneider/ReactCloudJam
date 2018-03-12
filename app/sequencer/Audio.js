export default class AudioAPI {
  constructor() {
    this._audioContext = new AudioContext();
  }

  getCurrentTime() {
    return this._audioContext.currentTime;
  }

  playBuffer(buffer, time) {
    const audioNode = this._audioContext.createBufferSourceNode();
    audioNode.buffer = buffer;
    audioNode.start(time);
  }
}