import axios from 'axios';

export default class AudioAPI {
  constructor() {
    this._audioContext = new AudioContext();
    this._sampleBuffer = [];
  }

  getCurrentTime() {
    return this._audioContext.currentTime;
  }

  playBuffer(buffer, time) {
    const audioNode = this._audioContext.createBufferSource();
    audioNode.buffer = buffer;
    audioNode.connect(this._audioContext.destination);
    audioNode.start(time);

  }

  scheduleSample(index, timestamp) {
    if (index > 0 && index < this._sampleBuffer.length) {
      console.log('Play at timestamp: ' + timestamp);
      this.playBuffer(this._sampleBuffer[index], timestamp);
    }
  }


  addSampleFromBuffer(buffer) {
    this._sampleBuffer.push(buffer);
  }

  addSampleFromFilename(filename) {
    axios({
        method: 'get',
        url: filename,
        responseType: 'arraybuffer'
      })

      .then((response) => {
        this._audioContext.decodeAudioData(response.data, (buffer) => {
          this.addSampleFromBuffer(buffer);
        });
      });
  }
}