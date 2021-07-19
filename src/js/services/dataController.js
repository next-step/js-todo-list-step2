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
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(body)
      })
    } else {
      res = await fetch(this.baseURL + url, {
        method,
      })
    }
    if (res.ok) {
      return await res.json();
    }
    throw new Error();
  }

  getData = async (url) => {
    try {
      return await this.fetching(url, 'GET');
    } catch (e) {
      throw new Error("response was not ok");
    }
  }
  postData =  async (url, body) => {
    try {
      return await this.fetching(url, 'POST', body);
    } catch (e) {
      throw new Error("response was not ok");
    }
  }
  putData = async (url, body) => {
    try {
      return await this.fetching(url, 'PUT', body);
    } catch (e) {
      throw new Error("response was not ok");
    }
  }
  deleteData = async (url) => {
    try {
      return await this.fetching(url, 'DELETE');
    } catch (e) {
      throw new Error("response was not ok");
    }
  }
}

export default DataController;