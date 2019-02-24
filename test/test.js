import GameSavingLoader from '../src/function';

test('Загрузка и чтение', () => {
  const expected = {
    id: 9,
    created: 1546300800,
    userInfo: {
      id: 1, name: 'Hitman', level: 10, points: 2000,
    },
  };
  const gameSavingLoader = new GameSavingLoader();
  const load = gameSavingLoader.load();
  return load.then((result) => { expect(result).toEqual(expected); });
});
