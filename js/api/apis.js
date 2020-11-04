import API from './index.js';
import { parseHash } from '../utils/index.js';
import { FILTER } from '../constants/index.js';

export const init = async () => {
  const users = await API.GET('/users');

  return {
    users,
    currentUser: users[0]?._id,
    todoList: users[0]?.todoList || [],
    currentFilter: parseHash(location.hash) || FILTER.ALL,
  };
};

export const addUser = async ({ name }) => {
  const user = await API.POST('/users', { name });
  const users = await API.GET('/users');

  return {
    users,
    currentUser: user._id,
    todoList: user.todoList,
  };
};

export const deleteUser = async ({ userId }) => {
  const response = await API.DELETE('/users/' + userId);
  const users = await API.GET('/users');

  return {
    users,
    currentUser: users[0]?._id,
    todoList: users[0]?.todoList || [],
  };
};

export const changeUser = async ({ id }) => ({
  currentUser: id,
  todoList: await API.GET('/users/' + id + '/items'),
});

export const addTodo = async ({ contents, userId }) => ({
  todoItem: await API.POST('/users/' + userId + '/items', {
    contents,
  }),
});

export const deleteTodo = async ({ id, userId }) => ({
  todoList: (await API.DELETE('/users/' + userId + '/items/' + id)).todoList,
});

export const deleteAllTodos = async ({ userId }) => {
  await API.DELETE('/users/' + userId + '/items');
  return {};
};

export const toggleTodo = async ({ id, userId }) => ({
  todoItem: await API.PUT('/users/' + userId + '/items/' + id + '/toggle'),
});

export const updateTodo = async ({ id, contents, userId }) => ({
  todoItem: await API.PUT('/users/' + userId + '/items/' + id, {
    contents,
  }),
});

export const setPriority = async ({ id, priority, userId }) => ({
  todoItem: await API.PUT('/users/' + userId + '/items/' + id + '/priority', {
    priority,
  }),
});
