import GameSavingLoader from './function';
const gameSavingLoader = new GameSavingLoader();
const load = gameSavingLoader.load();
load.then(result => console.log(result)).catch(
  (error) => { console.log('Ошибка обработки'); },
);
