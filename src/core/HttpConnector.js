import HttpMethods from "../constants/HttpMethods.js";

const defaultConfig = {
  baseUrl: "",
  headers: { "Content-type": "application/json" },
};

function HttpConnector(initConfig = defaultConfig) {
  this.defaultConfig = initConfig;
}

HttpConnector.prototype.getEndPoint = function (url) {
  return this.defaultConfig.baseUrl + url;
};

HttpConnector.prototype.request = function (url, config) {
  const endPoint = this.getEndPoint(url);

  return fetch(endPoint, config).then((response) => response.json());
};

HttpConnector.prototype.requestWithBody = function (url, config) {
  const endPoint = this.getEndPoint(url);
  const headers = config.headers || this.defaultConfig.headers;

  return fetch(endPoint, {
    ...config,
    method: config.method,
    body: JSON.stringify(config.data),
    headers,
  }).then((response) => response.json());
};

[HttpMethods.GET, HttpMethods.DELETE].forEach((method) => {
  HttpConnector.prototype[method.toLowerCase()] = function (url, config) {
    return this.request(url, {
      method,
      ...config,
    });
  };
});

[HttpMethods.POST, HttpMethods.PUT, HttpMethods.PATCH].forEach((method) => {
  HttpConnector.prototype[method.toLowerCase()] = function (url, data, config) {
    return this.requestWithBody(url, {
      method,
      data,
      ...config,
    });
  };
});
