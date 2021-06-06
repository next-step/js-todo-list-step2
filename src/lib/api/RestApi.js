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
    return await fetch(url);
  }
  fetch(url, config);
};

export const POST = (uri, body) => request(uri, HttpMethod.POST, body);

export const GET = (uri) => request(uri, HttpMethod.GET);
