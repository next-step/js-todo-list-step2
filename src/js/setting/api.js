import { baseUrl, uri } from "./apiSetting.js";

export function GET_USERS() {
  return GET({apiUri:'GET_USERS'});
}

export function ADD_USER(name) {
  return POST({apiUri:'ADD_USER', data:{name}});
}

export function DELETE_USER(id) {
  return POST({apiUri:'DELETE_USER', parameter:id, method:'DELETE'});
}

export function GET_USER_TODOITEMS(id) {
  return GET({apiUri:'GET_USER_TODOITEMS', parameter:id});
}

export function ADD_USER_TODOITEM(id, contents) {
  return POST({apiUri: 'ADD_USER_TODOITEM', parameter:id, data: {contents}});
}

export function DELETE_USER_TODOITEMS(userId) {
  return POST({apiUri:'DELETE_USER_TODOITEMS', parameter: userId, method: "DELETE"});
}

export function DELETE_USER_TODOITEM(userId, itemId) {
  return POST({apiUri:'DELETE_USER_TODOITEM', parameter: {userId, itemId}, method:"DELETE"});
} 

export function UPDATE_USER_TODOITEM(userId, itemId, contents) {
  return POST({apiUri: 'UPDATE_USER_TODOITEM', parameter: {userId, itemId}, data: {contents}, method:"PUT"});
}

export function UPDATE_USER_TODOITEM_PRIORTY(userId, itemId, priority) {
  return POST({apiUri: 'UPDATE_USER_TODOITEM_PRIORTY', parameter: {userId, itemId}, data: {priority}, method: "PUT"});
}

export function UPDATE_USER_TODOITEM_COMPLETE(userId, itemId) {
  return POST({apiUri: 'UPDATE_USER_TODOITEM_COMPLETE', parameter:{userId, itemId}, method:'PUT'});
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
