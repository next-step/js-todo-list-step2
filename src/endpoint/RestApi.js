import HttpMethod from './HttpMethod.js';
import env from '../env.js';

const _baseURL = env.baseURL;


const request = async (uri, method, body = undefined, timeout = 5000) => {
  const config = { method };
  const url = _baseURL + uri;

  if (body) {
    config.body = JSON.stringify(body);
    config.headers = { 'Content-Type': 'application/json' };
  }

  let id = -1;
  const race = await Promise.race([
    new Promise(res => {
      id = window.setTimeout(() => res(), timeout)
    }),
    fetch(url, config)
  ]);

  if (race instanceof Response) {
    clearTimeout(id);
    const contents = await race.json();
    if (race.status === 404) throw new Error('404');
    if (race.status === 500) throw new Error(contents.message);
    return contents;
  }
  throw new Error('timeout');
};

const GET = (uri) => request(uri, HttpMethod.GET);

const POST = (uri, body) => request(uri, HttpMethod.POST, body);

const PUT = (uri, body) => request(uri, HttpMethod.PUT, body);

const PATCH = (uri, body) => request(uri, HttpMethod.PATCH, body);

const DELETE = (uri) => request(uri, HttpMethod.DELETE);

export default { GET, POST, PUT, PATCH, DELETE };

