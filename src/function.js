class GameSavingData {
  constructor(data) {
    this.data = data;
  }

  json() {
    return new Promise((resolve, reject) => {
      // эмуляция обработки ArrayBuffer
      setTimeout(() => {
        resolve(String.fromCharCode.apply(null, new Uint16Array(this.data)));
      }, 1000);
    });
  }
}

function readGameSaving() {
  return new Promise((resolve, reject) => {
    // эмуляция чтения файла
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
    }, 5000);
  });
}

export default class GameSavingLoader {
  load() {
    return new Promise((resolve, reject) => {
      const data = readGameSaving();
      data.then((buffer) => {
        const gameSavingData = new GameSavingData(buffer);
        const str = gameSavingData.json();
        str.then((st) => {
          const result = JSON.parse(st);
          resolve(result);
        });
      });
    });
  }
}