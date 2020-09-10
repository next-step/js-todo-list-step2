import HttpMethod from '../constants/HttpMethod.js';

export const RestClient = class {

  #baseURL;

  constructor (baseURL) {
    this.#baseURL = baseURL;
  }

  #getUrlOf (uri) {
    const isSlash = uri[0] === '/' ? '' : '/'
    return `${this.#baseURL}${isSlash}${uri}`;
  }

  #request (uri, method) {
    const url = this.#getUrlOf(uri);
    return fetch(url, { method }).then(response => response.json());
  }

  #requestWithBody (uri, method, body = null) {
    const url = this.#getUrlOf(uri);
    const headers =  { 'Content-Type': 'application/json' };
    const config = { method, headers };
    if (body !== null) {
      config.body = JSON.stringify(body);
    }
    return fetch(url, config).then(response => response.json());
  }

  get (uri) {
    return this.#request(uri, HttpMethod.GET);
  }

  post (uri, body) {
    return this.#requestWithBody(uri, HttpMethod.POST, body);
  }

  put (uri, body) {
    return this.#requestWithBody(uri, HttpMethod.PUT, body);

  }

  patch (uri, body) {
    return this.#requestWithBody(uri, HttpMethod.PATCH, body);
  }

  delete (uri) {
    return this.#request(uri, HttpMethod.DELETE);
  }

}