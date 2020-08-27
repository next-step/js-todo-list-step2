import config from '../config/index.js';

export const getTodoItems = async (userName) => {
  const response = await fetch(`${config.baseUrl}/u/${userName}/item`);
  const todos = await response.json();
  return todos;
};

export const addTodoItem = async (userName, contents) => {
  const response = await fetch(`${config.baseUrl}/u/${userName}/item/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents,
    }),
  });
  const todo = await response.json();
  return todo;
};

export const updateTodoItem = async (userName, itemId, contents) => {
  const response = await fetch(
    `${config.baseUrl}/u/${userName}/item/${itemId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
      }),
    }
  );
  const todo = await response.json();
  return todo;
};

export const updateTodoPriority = async (userName, itemId, priority) => {
  const response = await fetch(
    `${config.baseUrl}/u/${userName}/item/${itemId}/priority`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priority,
      }),
    }
  );
  const todo = await response.json();
  return todo;
};

export const deleteTodoItem = async (userName, itemId) => {
  const response = await fetch(
    `${config.baseUrl}/u/${userName}/item/${itemId}`,
    {
      method: 'DELETE',
    }
  );
  const todo = await response.json();
  return todo;
};

export const allDeleteTodoItem = async (userName, itemId) => {
  const response = await fetch(`${config.baseUrl}/u/${userName}/items`, {
    method: 'DELETE',
  });
  const todo = await response.json();
  return todo;
};

export const toggleTodo = async (userName, itemId) => {
  const response = await fetch(
    `${config.baseUrl}/u/${userName}/item/${itemId}/toggle`,
    {
      method: 'PUT',
    }
  );
  const todo = await response.json();
  return todo;
};
