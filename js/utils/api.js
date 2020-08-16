const BASE_URL = 'https://blackcoffee-todolist.df.r.appspot.com/api/u';

const option = {
  post: (contents) => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents,
    }),
  }),

  delete: () => ({
    method: 'DELETE',
  }),

  toggle: () => ({
    method: 'PUT',
  }),

  edit: (contents) => ({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents,
    }),
  }),

  // fixme - 500 error
  editPriority: (priority) => ({
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      priority,
    }),
  }),
};

const isSuccessResponse = (status) => !!(status >= 200 && status < 300);

export const request = async (url, option = {}) => {
  const response = await fetch(url, option);
  if (!isSuccessResponse(response.status)) {
    throw new Error(`http request Error : ${response.status}`);
  }

  return await response.json();
};

export const api = {
  fetchUserList: () => {
    return request(`${BASE_URL}/`);
  },

  fetchUserTodo: (userName) => {
    return request(`${BASE_URL}/${userName}/item`);
  },

  addTodo: (userName, contents) => {
    return request(`${BASE_URL}/${userName}/item`, option.post(contents));
  },

  deleteTodo: (userName, todoId) => {
    return request(`${BASE_URL}/${userName}/item/${todoId}`, option.delete());
  },

  toggleTodo: (userName, todoId) => {
    return request(
      `${BASE_URL}/${userName}/item/${todoId}/toggle`,
      option.toggle(),
    );
  },

  editTodoContent: (userName, todoId, contents) => {
    return request(
      `${BASE_URL}/${userName}/item/${todoId}`,
      option.edit(contents),
    );
  },

  // fixme - 500 error
  editTodoPriority: (userName, todoId, priority) => {
    return request(
      `${BASE_URL}/${userName}/item/${todoId}`,
      option.editPriority(priority),
    );
  },

  deleteAllTodo: (userName) => {
    return request(`${BASE_URL}/${userName}/items`, option.delete());
  },
};
