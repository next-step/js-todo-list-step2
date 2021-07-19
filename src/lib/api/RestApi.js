import HttpMethod from '../../constants/HttpMethod.js';
import baseUrl from '../../config/env.js';

const request = async (uri, method, body = undefined) => {
  const config = { method };
  const url = baseUrl + uri;
  if (body) {
    config.body = JSON.stringify(body);
    config.headers = { 'Content-Type': 'application/json' };
  }
  if (method === HttpMethod.GET) {
    return await fetch(url).then((res) => res.json());
  }
  fetch(url, config);
};

export const POST = (uri, body) => request(uri, HttpMethod.POST, body);

export const GET = (uri) => request(uri, HttpMethod.GET);

export const DELETE = (uri) => request(uri, HttpMethod.DELETE);
