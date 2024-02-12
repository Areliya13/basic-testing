// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

const res = 5;
const errorMsg = 'Simple error';
const defaultErrorMsg = 'Oops!';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const result = await resolveValue(res);
    expect(result).toBe(res);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError(errorMsg)).toThrow(errorMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrow(defaultErrorMsg);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
