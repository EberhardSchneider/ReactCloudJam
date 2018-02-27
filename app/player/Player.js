import Scheduler from '../player/Scheduler';

const TICK_INTERVAL = 100;


export default class Player {
  constructor(samples) {
    this.context = new AudioContext();
    this.scheduler = new Scheduler(this.context);
  }
}