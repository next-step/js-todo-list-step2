import { REQUEST_METHODS, fetchRequest } from './util.js';

const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
let _currentUserId = '';

const userStore = () => {
  const setCurrentUser = (userId) => {
    _currentUserId = userId; //TODO
  };

  const getUser = async (userId) => {
    return fetchRequest(`${BASE_URL}/api/users/${userId}`);
  };

  const getUsers = async () => {
    return fetchRequest(`${BASE_URL}/api/users`);
  };

  const createUser = async (name) => {
    return fetchRequest(`${BASE_URL}/api/users`, REQUEST_METHODS.post, {
      name,
    });
  };

  const deleteUser = async () => {
    await fetchRequest(
      `${BASE_URL}/api/users/${_currentUserId}`,
      REQUEST_METHODS.delete
    );
    _currentUserId = '';
  };

  return {
    setUser(userId) {
      setCurrentUser(userId);
      return getUser(userId);
    },
    getUsers,
    createUser,
    deleteUser,
  };
};

const todoItemStore = () => {
  const getTodoList = async () => {
    return fetchRequest(`${BASE_URL}/api/users/${_currentUserId}/items`);
  };

  const createTodo = async (contents) => {
    return fetchRequest(
      `${BASE_URL}/api/users/${_currentUserId}/items`,
      REQUEST_METHODS.post,
      { contents }
    );
  };

  const deleteTodo = async (todoId) => {
    await fetchRequest(
      `${BASE_URL}/api/users/${_currentUserId}/items/${todoId}`,
      REQUEST_METHODS.delete
    );
  };

  function updateTodoContents(todoId, contents) {
    return fetchRequest(
      BASE_URL + `/api/users/${_currentUserId}/items/${todoId}`,
      REQUEST_METHODS.put,
      { contents }
    );
  }

  function updateTodoToggle(todoId) {
    return fetchRequest(
      BASE_URL + `/api/users/${_currentUserId}/items/${todoId}/toggle`,
      REQUEST_METHODS.put
    );
  }

  return {
    getTodoList,
    createTodo,
    deleteTodo,
    updateTodoContents,
    updateTodoToggle,
  };
};

export { userStore, todoItemStore };
