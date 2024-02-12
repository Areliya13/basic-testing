// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs/promises';
import fsSync from 'fs';
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();
    doStuffByTimeout(cb, 0);
    expect(timeoutSpy).toBeCalled();
  });

  test('should call callback only after timeout', () => {
    const cb = jest.fn();
    doStuffByTimeout(cb, 0);
    expect(cb).not.toBeCalled();
    jest.runAllTimers();
    expect(cb).toBeCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const cb = jest.fn();
    doStuffByInterval(cb, 1);
    expect(intervalSpy).toBeCalled();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const cb = jest.fn();
    doStuffByInterval(cb, 1);
    jest.advanceTimersByTime(10);
    expect(cb).toBeCalled();
    expect(cb).toBeCalledTimes(10);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathSpy = jest.spyOn(path, 'join');
    await readFileAsynchronously('test.txt');
    expect(pathSpy).toBeCalled();
  });

  test('should return null if file does not exist', async () => {
    const res = await readFileAsynchronously('test.txt');
    expect(res).toBeNull();
  });

  test('should return file content if file exists', async () => {
    const content = 'Hello!';
    jest.spyOn(fsSync, 'existsSync').mockReturnValue(true);
    jest.spyOn(fs, 'readFile').mockReturnValue(Promise.resolve(content));
    const res = await readFileAsynchronously('test.txt');
    expect(res).toBe(content);
  });
});
