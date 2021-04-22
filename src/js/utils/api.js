import Users from '../components/user/Users.js';
import { userItems } from './events.js';

function fetchAPI(path, method, data) {
  const baseUrl = `https://js-todo-list-9ca3a.df.r.appspot.com/api/${path}`;

  const option = {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }

  const fetchDatas = fetch(baseUrl, option)
    .then(response => response.json())
    .then(datas => {
      const users = new Users();
      users.setState(datas);
      userItems.push(datas);
    })
    .catch(error => console.error('Error:', error));
  
  return fetchDatas;
}

export async function getFetchItems(path = 'users', method = 'GET', data) {
  const fetchItems = await fetchAPI(path, method, data);
  
  return fetchItems;
}
