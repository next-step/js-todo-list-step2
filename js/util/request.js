// const fetch = require("node-fetch"); api test시, 주석 삭제
const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/';

export const request = (method, url = '/', payload = '') => {
  const option = {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
  };
  if(payload){
    option.body = JSON.stringify(payload);
  }

  return fetch(BASE_URL + url, option);
};

export const HTTP_METHOD = {
  GET : 'GET',
  POST : 'POST',
  PUT : 'PUT',
  DELETE : 'DELETE'
}

export const PRIORITY = [
  'NONE',
  'FIRST',
  'SECOND'
];





