import HttpMethod from '../constants/HttpMethod.js';

const RestApi = (baseURL) => {

  const request = async ({ uri, method, body }, timeout = 5000) => {
    const config = { method };
    const url = baseURL + uri;

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
      if (race.status === 404) new Error('404');
      return await race.json();
    }
    new Error('timeout');
  };

  const GET = (uri) => request({ uri, method: HttpMethod.GET });

  const POST = (uri, body) => request({ uri, method: HttpMethod.POST, body });

  const PUT = (uri, body) => request({ uri, method: HttpMethod.PUT, body });

  const PATCH = (uri, body) => request({ uri, method: HttpMethod.PATCH, body });

  const DELETE = (uri) => request({ uri, method: HttpMethod.DELETE });
};

export default RestApi;