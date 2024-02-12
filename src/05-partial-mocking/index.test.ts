// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: () => true,
    mockTwo: () => true,
    mockThree: () => true,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const mockLog = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(mockLog).not.toBeCalled();
  });

  test('unmockedFunction should log into console', () => {
    const mockLog = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(mockLog).toBeCalled();
  });
});
