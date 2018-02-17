export default class Player {
  constructor(samples) {
    this.audioElements = [];
    samples.map((filename) => {
      const audio = new Audio(filename);
      audio.preload = 'auto';
      this.audioElements.push(audio);
    });
    this.index = 0;
  }



  play(pattern, playPosition) {
    pattern[playPosition].map((cell, index) => {
      if (cell != 0) {
        this.audioElements[index].stop();
        this.audioElements[index].play();
        this.index++;
        console.log(this.index);
      }
    });
  }
}