import HttpMethod from '../constants/HttpMethod.js';

let _baseURL;

export const setBaseURL = (baseURL) => _baseURL = baseURL;

// TODO 호출시 error 가 catch 되지 않음
const request = async (uri, method, body = undefined, timeout = 5000) => {
  const config = { method };
  const url = _baseURL + uri;

  if (body) {
    config.body = JSON.stringify(body);
    config.headers = { 'Content-Type': 'application/json' };
  }

  let id = -1;
  const race = await Promise.race([
    new Promise(res => id = window.setTimeout(_ => res(), timeout)),
    fetch(url, config).then(response => response),
  ]);

  if (race instanceof Response) {
    clearTimeout(id);
    const contents = await race.json();

    if (race.status === 500) return new Error(contents.message);
    return race.status === 404 ? new Error('404') : contents;
  }
  else return new Error('timeout');
};

const GET = (uri) => request(uri, HttpMethod.GET);

const POST = (uri, body) => request(uri, HttpMethod.POST, body);

const PUT = (uri, body) => request(uri, HttpMethod.PUT, body);

const PATCH = (uri, body) => request(uri, HttpMethod.PATCH, body);

const DELETE = (uri) => request(uri, HttpMethod.DELETE);

export default { GET, POST, PUT, PATCH, DELETE };

