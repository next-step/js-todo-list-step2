import { baseUrl, uri } from "./apiSetting.js";

export function GET_USERS() {
  return GET({apiUri:'GET_USERS'});
}

export function ADD_USER(name) {
  return POST({apiUri:'ADD_USER', data:{name}});
}

export function DELETE_USER(id) {
  return POST('DELETE_USER', parameter=id, method='DELETE');
}

export function GET_USER_TODOITEMS(id) {
  return GET({apiUri:'GET_USER_TODOITEMS', parameter:id});
}

function GET({apiUri, parameter = ''}) {
  return fetch(baseUrl + uri[apiUri](parameter))
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

function POST({apiUri, parameter = '', data = {}, method = 'POST'}) {
  postOption['method'] = method;
  postOption['body'] = JSON.stringify(data);
  return fetch(baseUrl + uri[apiUri](parameter), postOption)
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