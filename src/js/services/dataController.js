import { BASE_URL } from "../constant/constant.js";

class DataController {
  constructor() {
    this._baseURL = BASE_URL;
  }

  get baseURL() {
    return this._baseURL;
  }

  fetching = async (url, method, body) => {
    let res;
    if (body) {
      res = await fetch(this.baseURL + url, {
        method,
        body: JSON.stringify(body)
      })
    } else {
      res = await fetch(this.baseURL + url, {
        method,
      })
    }
    return await res.json();
  }

  getData = async (url) => {
    return await this.fetching(url, 'GET');
  }
  postData =  async (url, body) => {
    return await this.fetching(url, 'POST', body);
  }
  putData = async (url, body) => {
    return await this.fetching(url, 'PUT', body);
  }
  deleteData = async (url) => {
    return await this.fetching(url, 'DELETE');
  }
}

export default DataController;