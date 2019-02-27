import GameSavingLoader from '../src/function';
import readGameSaving from '../src/readGameSaving';


jest.mock('../src/readGameSaving.js');

beforeEach(() => {
  jest.resetAllMocks();
});

test('Загрузка и чтение', async () => {
  const expected = {
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1, name: 'Hitman', level: 10, points: 2000,
    },
  };

  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
      return ((input) => {
        const buffer = new ArrayBuffer(input.length * 2);
        const bufferView = new Uint16Array(buffer);
        for (let i = 0; i < input.length; i++) {
          bufferView[i] = input.charCodeAt(i);
        }
        resolve(buffer);
      })(data);
    }, 500);
  });
  readGameSaving.mockReturnValue(prom);
  const gameSavingLoader = new GameSavingLoader();
  const load = gameSavingLoader.load();
  return load.then((result) => { expect(result).toEqual(expected); });
});

test('Ошибка', async () => {
  const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = '{"id:9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
      return ((input) => {
        const buffer = new ArrayBuffer(input.length * 2);
        const bufferView = new Uint16Array(buffer);
        for (let i = 0; i < input.length; i++) {
          bufferView[i] = input.charCodeAt(i);
        }
        resolve(buffer);
      })(data);
    }, 500);
  });
  readGameSaving.mockReturnValue(prom);
  const expected = 'Неверный JSON';
  const gameSavingLoader = new GameSavingLoader();
  const load = gameSavingLoader.load();
  return load.catch(
    (result) => { expect(result).toEqual(expected); },
  );
});
