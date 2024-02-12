// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  const albumPath = 'albums/1';

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const axiosSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(albumPath);
    jest.runAllTimers();
    expect(axiosSpy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const axiosSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue({});
    await throttledGetDataFromApi(albumPath);
    jest.runAllTimers();
    expect(axiosSpy).toBeCalledWith(albumPath);
  });

  test('should return response data', async () => {
    const resp = [
      {
        userId: 1,
        id: 1,
        title: 'quidem molestiae enim',
      },
    ];
    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue({ data: resp });
    const result = await throttledGetDataFromApi(albumPath);
    jest.runAllTimers();
    expect(result).toStrictEqual(resp);
  });
});
