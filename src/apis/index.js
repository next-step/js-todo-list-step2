const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const $request = async (url = '', options) => {
  try {
    const res = await fetch(`${BASE_URL}/${url}`, options);
    if (!res.ok) {
      throw new Error('서버의 상태가 이상합니다');
    }
    return await res.json();
  } catch (error) {
    throw new Error(`무언가 잘못되었습니다! ${error.message}`);
  }
};

export const $http = {
  get: (url) => $request(url),
  post: (url, body = '') => {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    return $request(url, options);
  },
  put: (url, body = '') => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };
    return $request(url, options);
  },
  delete: (url) => $request(url, { method: 'DELETE' }),
};
