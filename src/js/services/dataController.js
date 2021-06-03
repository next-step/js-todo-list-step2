import { BASE_URL } from "../constant/constant.js";

class DataController {
  constructor() {
    this._baseURL = BASE_URL;
  }

  /* 내부 변수선언은 _baseURL로 해놓고
    해당 내부 변수에 대한 set없이 get 메서드만 구현해 놓으면
    클래스 외부에서 baseURL을 조작할 수 없기 때문에 private하게 사용할 수 있다. */
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