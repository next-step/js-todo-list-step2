import HttpMethod from "../constants/HttpMethod.js";

export const RestClient = class {

  #baseURL; #abortController;

  constructor (baseURL) {
    this.#baseURL = baseURL;
    this.#abortController = new AbortController();
  }

  #getRequestURLOf (uri) {
    const slash = uri[0] === '/' ? '' : '/';
    return `${this.#baseURL}${slash}${uri}`;
  }

  #request (uri, method = HttpMethod.GET) {
    const url = this.#getRequestURLOf(uri);
    return fetch(url, { method }).then(response => response.json());
  }

  #requestWithBody (uri, method, body) {
    const url = this.#getRequestURLOf(uri);
    const headers = { 'Content-Type': 'application/json' };
    const config = { method, headers };
    if (body) config.body = JSON.stringify(body);
    return fetch(url, config).then(response => response.json());
  }

  get (uri) {
    return this.#request(uri);
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

  abort () {
    this.#abortController.abort();
  }
}