import {METHOD} from "./Urls.js";

export default class RequestAPI {

  constructor({url, method = "GET", message = {} }) {
    this._url = url;
    this._method = method;
    this._message = message;
    this._option = {
      method: this._method
    }
  }

  static of({url, method, message}) {
    return new RequestAPI({url, method, message});
  }

  setData(target, value) {
    this._url = this._url.replace(target, value);
    return this;
  }

  setHeader() {
    return {headers: {"Content-Type": "application/json"}}
  }

  isRequiredHeader() {
    return [METHOD.POST, METHOD.PUT].includes(this._method);
  }

  setBody() {
    return {body: JSON.stringify(this._message)}
  }

  getOption() {
    if (this.isRequiredHeader()) {
      return {...this._option, ...this.setHeader(), ...this.setBody()};
    }

    return {...this._option}
  }


  async request() {
    const response = await fetch(this._url, this.getOption());
    return await response.json();
  }
}