


  export const base_url = "https://js-todo-list-9ca3a.df.r.appspot.com/api/users/";

  export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
  };
export const fetchAPI = async (url = '', method = METHOD.GET, payload = {}) => {
  try {
    const option = {
      method,
      headers : { 'Content-Type': 'applicatoin/json' }
    }
    if (method!==METHOD.GET) {

      option.body = JSON.stringify(payload);
    }
    const response = await fetch(`${base_url}${url}`, option);
    if (!response.ok) { throw new Error(response.status); }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (e) {
    console.error(e);
  } 
  };

  export const PRIORITY = {
    0: 'FIRST',
    1: 'NONE',
    2: 'SECOND'
    
  }
  export const Filter = {
    active: 'active',
    all: 'all',
    completed: 'completed'
  }


