import HttpMethods from "../constants/HttpMethods";

const defaultConfig = {
    baseUrl: ""
};

function HttpConnector(initConfig = defaultConfig) {
    this.defaultConfig = initConfig;
}

HttpConnector.prototype.request = function request(url, config) {
    const requestUrl = this.defaultConfig.baseUrl + url;

    return fetch(requestUrl, config).then((response) => response.json())
};

HttpConnector.prototype.requestWithBody = function requestWithBody(url, config) {
    const requestUrl = this.defaultConfig.baseUrl + url;
    const headers = config.headers || { 'Content-Type': 'application/json' };

    return fetch(requestUrl, {
        ...config,
        method: config.method,
        body: JSON.stringify(config.data),
        headers,
    }).then((response) => response.json())
};

[HttpMethods.GET, HttpMethods.DELETE].forEach((method) => {
   HttpConnector.prototype[method] = function (url, config) {
       return this.request(url, {
           method,
           ...config,
       })
   }
});

[HttpMethods.POST, HttpMethods.PUT, HttpMethods.PATCH].forEach((method) => {
   HttpConnector.prototype[method] = function (url, data, config) {
       return this.requestWithBody(url, {
           method,
           data,
           ...config,
       })
   }
});

export default HttpConnector;