import { baseUrl, uri } from "./apiSetting.js";

export function GET_USERS() {
  return GET('GET_USERS');
}

export function ADD_USER(name) {
  return POST('ADD_USER', {name});
}

function GET(apiUri) {
  return fetch(baseUrl + uri[apiUri])
  .then(res => {
    if (!res.ok) {
      throw new Error(res.status)
    }
    return res.json()
  })
  .then(data => data)
  .catch(error => {
    console.log(error)
  });
}

function POST(apiUri, data) {
  postOption['body'] = JSON.stringify(data);
  return fetch(baseUrl + uri[apiUri], postOption)
  .then(res => {
    if (!res.ok) {
      throw new Error(res.status)
    }
    return res.json()
  })
  .then(data => data)
  .catch(error => {
    console.log(error)
  });
}


const postOption = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}