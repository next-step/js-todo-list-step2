/**
 * @typedef HermesRequestConfig
 * @property {string} baseURL
 * @property {HermesHeaders} headers
 * @property {number} timeout
 */

/**
 * @module Hermes
 */
class Hermes {
  /**
   * @param {HermesRequestConfig} config
   */
  constructor(config) {
    this.baseURL = config.baseURL ?? '';
    this.headers = config.headers ?? {};
    this.timeout = config.timeout;
  }

  /**
   * @param {string} method HTTP methods
   * @param {string} url domain uri
   * @param {any} payload
   */
  _request(method, url, payload) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.timeout = this.timeout ?? 0;

      url = this.baseURL + (url ?? '');
      xhr.open(method, url);

      Object.keys(this.headers).forEach(key => {
        xhr.setRequestHeader(key, this.headers[key]);
      });

      xhr.setRequestHeader('content-type', 'application/json');
      xhr.send(JSON.stringify(payload));

      xhr.ontimeout = () => console.warn('Timeout occured!');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200 || xhr.status === 201) {
          resolve({ data: JSON.parse(xhr.response) });
        } else {
          reject(new Error(xhr.status));
        }
      };
    });
  }

  get(url) {
    return this._request('GET', url);
  }
  post(url, payload) {
    if (!payload || typeof url !== 'string')
      return this._request('POST', '', url);

    return this._request('POST', url, payload);
  }
  put(url, payload) {
    return this._request('PUT', url, payload);
  }
  delete(url = this.url) {
    return this._request('DELETE', url);
  }

  /**
   * @param {HermesRequestConfig} config
   */
  static create(config) {
    return new this(config);
  }
}

export default Hermes;
