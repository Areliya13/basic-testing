// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 1, b: 2, action: Action.Subtract, expected: -1 },
  { a: 3, b: 0, action: Action.Multiply, expected: 0 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
  { a: 1, b: false, action: Action.Add, expected: null },
  { a: 3, b: 2, action: null, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'Case $a $action $b equals $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
