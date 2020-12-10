const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const option = {

  post: (contents) => ({
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(contents),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  put: (contents) => ({
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(contents),
  }),

}

//요청 보내는 함수
const request = async (url, option = {}) => {
  const response = await fetch(url, option);

  if (!response.ok) {
    throw new Error(response.status)
  }

  return await response.json();
};


const api = {

  loadToDos : () => {
    return request(`${BASE_URL}/api/users`);
  },

  addUser : (contents) => {
    return request(`${BASE_URL}/api/users`, option.post(contents));
  },

  selectUserToDo : (userId) => {
    return request(`${BASE_URL}/api/users/${userId}`);
  },

  deleteUser : (userId) => {
    return request(`${BASE_URL}/api/users/${userId}`,option.delete());
  },

  //TODO
  addToDo : (userId, contents) => {
    return request(`${BASE_URL}/api/users/${userId}/items`, option.post(contents));
  },

  deleteToDo : (userId, itemId) => { ///api/users/:userId/items/:itemId
    return request(`${BASE_URL}/api/users/${userId}/items/${itemId}`, option.delete());
  },
  
  editToDo : (userId, itemId, contents) => { //PUT	/api/users/:userId/items/:itemId
    return request(`${BASE_URL}/api/users/${userId}/items/${itemId}`, option.put({contents}));
  },
  
  toggleToDo : (userId, itemId) => { ///api/users/:userId/items/:itemId/toggle
    return request(`${BASE_URL}/api/users/${userId}/items/${itemId}/toggle`, option.put());
  },
  
  setPriorityToDo : (userId, itemId, priority) => {//PUT	/api/users/:userId/items/:itemId/priority
    console.log(userId, itemId, priority)
    return request(`${BASE_URL}/api/users/${userId}/items/${itemId}/priority`, option.put({priority}));
    
  },
  deleteAllToDo : (userId) => { //DELETE	/api/users/:userId/items/
    return request(`${BASE_URL}/api/users/${userId}/items/`, option.delete());

  }
}

export default api;


