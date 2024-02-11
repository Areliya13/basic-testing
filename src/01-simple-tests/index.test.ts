// Uncomment the code below and write your tests
// import { simpleCalculator, Action } from './index';

import { Action, simpleCalculator } from '01-simple-tests';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 1000, b: 3, action: Action.Add });
    expect(result).toBe(1003);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 1000, b: 3, action: Action.Subtract });
    expect(result).toBe(997);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 1000, b: 3, action: Action.Multiply });
    expect(result).toBe(3000);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 999, b: 3, action: Action.Divide });
    expect(result).toBe(333);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 10,
      action: Action.Exponentiate,
    });
    expect(result).toBe(1024);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 999, b: 3, action: 'noAction' });
    expect(result).toBeNull;
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: '999', b: 3, action: Action.Divide });
    expect(result).toBeNull;
  });
});
