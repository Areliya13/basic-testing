// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const result1 = { value: 1, next: { value: null, next: null } };
    const result2 = { value: 2, next: result1 };
    const result3 = { value: true, next: result2 };
    const result4 = { value: 4, next: result3 };
    const result5 = { value: 'end', next: result4 };
    expect(generateLinkedList([1])).toStrictEqual(result1);
    expect(generateLinkedList(['end', 4, true, 2, 1])).toStrictEqual(result5);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList(['end', 4, true, 2, 1]);
    expect(linkedList).toMatchSnapshot();
  });
});
