const response = async res => {

  if (!res.ok) {
    throw new Error(res);
  }

  const data = await res.json();

  return {
    data,
    status: res.status
  }

}

export const request = async params => {
  const {
    method = 'GET',
    url,
    body
  } = params;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';
  const res = await window.fetch(`${baseUrl}${url}`, config);

  return response(res);
}

import todos from './todos.js';
import users from './users.js';

export default {
  ...todos,
  ...users,
}