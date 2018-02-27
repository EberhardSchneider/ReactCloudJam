import Scheduler from '../Scheduler.js';

jest.useFakeTimers();

describe('audio scheduler', () => {
  let scheduler;
  let event;
  let eventsArray;
  let context;
  const now = 0;


  let callback;

  beforeEach(() => {
    event = {
      name: 'event1'
    };
    eventsArray = [
      {
        name: 'event1'
      },
      {
        name: 'event2'
      },
      {
        name: 'event3'
      }
    ];
    callback = jest.fn();
    scheduler = new Scheduler(callback);
    jest.clearAllTimers();

  });

  test('can be started and stopped', () => {
    expect(scheduler.isRunning()).toBe(false);
    scheduler.start();
    expect(scheduler.isRunning()).toBe(true);
    scheduler.stop();
    expect(scheduler.isRunning()).toBe(false);
  });

  test('can add single event to queue', () => {

    scheduler.addToQueue(event);

    expect(scheduler.eventQueue.length).toBe(1);
  });

  test('can add array of events to queue', () => {
    scheduler.addToQueue(eventsArray);
    expect(scheduler.eventQueue.length).toBe(eventsArray.length);
  });

  test('schedules single event with time difference 0', () => {
    event.timestamp = now;
    scheduler.addToQueue(event);
    scheduler.start(now);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(500);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  test('doesnt schedule past event', () => {
    const pastEvent = {
      name: 'past event',
      timestamp: now - 1
    };

    scheduler.addToQueue(pastEvent);
    scheduler.start(now);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(500);
    expect(callback).not.toBeCalled();
  });

  test('schedules event according to timestamp', () => {
    const scheduleFrequency = scheduler.getScheduleFrequency();

    const event1 = {
      name: 'event1',
      timestamp: scheduleFrequency - 1
    };
    const event2 = {
      name: 'event1',
      timestamp: scheduleFrequency + 1
    };
    const event3 = {
      name: 'event1',
      timestamp: 5 * scheduleFrequency + 1
    };

    scheduler.addToQueue([event1, event2, event3]);

    scheduler.start(0);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(scheduleFrequency);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(scheduleFrequency);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(scheduleFrequency);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(scheduleFrequency);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(scheduleFrequency);
    expect(callback).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(scheduleFrequency);
    expect(callback).toHaveBeenCalledTimes(3);
  });

  test('setTime() works correcty', () => {
    const scheduleFrequency = scheduler.getScheduleFrequency();

    const event1 = {
      name: 'event1',
      timestamp: -99
    };
    const event2 = {
      name: 'event1',
      timestamp: 1200
    };
    const event3 = {
      name: 'event1',
      timestamp: 20199
    };

    scheduler.addToQueue([event1, event2, event3]);
    scheduler.start(0);
    scheduler.setTime(event1.timestamp - scheduleFrequency);

    jest.advanceTimersByTime(scheduleFrequency);
    expect(callback).toHaveBeenCalledTimes(1);
    scheduler.setTime(event2.timestamp - scheduleFrequency);
    jest.advanceTimersByTime(scheduleFrequency);
    expect(callback).toHaveBeenCalledTimes(2);
    scheduler.setTime(event3.timestamp - scheduleFrequency);
    jest.advanceTimersByTime(scheduleFrequency);
    expect(callback).toHaveBeenCalledTimes(3);


  });
});