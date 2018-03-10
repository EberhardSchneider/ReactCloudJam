import Sequencer from '../Sequencer.js';

const seq = new Sequencer();

test('converts beats to time correctly', () => {
  const bpm = 120;
  const startTime = 10.0;
  const startBeat = 1;


  expect(seq.convertBeatsToTime(4, startTime, startBeat, bpm)).toBe(11.5);

  expect(seq.convertBeatsToTime(4, startTime, startBeat, 60)).toBe(13);

  expect(seq.convertBeatsToTime(0, 0, 0, 30)).toBe(0);

  expect(() => {
    seq.convertBeatsToTime(4, 2, 5, 0);
  }).toThrowError(Error);
});

test('converts events correctly from beat to time domain', () => {
  const bpm = 120;
  const startTime = 10.0;
  const startBeat = 1;
  const events = [

    {
      track: '1',
      velocity: '64',
      time: '2'
    },
    {
      track: '3',
      velocity: '84',
      time: '2.5'
    }
  ];

  const converted = seq.convertEventsToTime(events, startTime, startBeat, bpm);

  expect(Array.isArray(converted)).toBe(true);

  expect(Object.keys(events[0])).toEqual(Object.keys(converted[0]));

  expect(converted[0].time).toBe(10.5);
  expect(converted[1].time).toBe(10.75);



});