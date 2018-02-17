import axios from 'axios';

export default class SamplePlayer {
  constructor(filenameArray) {
    // cross browser context definition, see mozilla doc
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = new AudioContext();

    this.audioBuffers = [];
    this.audioSources = [];

    filenameArray.map((filename) => {
      const source = this.audioContext.createBufferSource();


      axios({
          method: 'get',
          url: filename,
          responseType: 'arraybuffer'
        })
        .then((response) => {
          console.log('data fetched...');
          this.audioContext.decodeAudioData(response.data, (buffer) => {
            console.log('decoding...');
            source.buffer = buffer;
            source.connect(this.audioContext.destination);

            this.audioBuffers.push(buffer);
            this.audioSources.push(source);
          });
        });
    });
  }

  playPattern(array) {
    array.map((cell, index) => {
      if (cell != 0) {
        this.audioSources[index].start();
      }
    });
  }

}