class LocalDB {
  constructor() {}

  getData(key) {
    try {
      return localStorage.getItem(key) || JSON.stringify([]);
    } catch (error) {
      console.error(`GET LocalStorage Data: ${error}`);
    }
  }

  setData(key, value = []) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`SET LocalStorage Data: ${error}`);
    }
  }
}

export default new LocalDB();
