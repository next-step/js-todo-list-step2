const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api/users';

export const getUsersList = async () => {
  try {
    const response = await fetch(`${BASE_URL}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async data => {
  try {
    const response = await fetch(`${BASE_URL}/${data}`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUserTodos = async data => {
  try {
    const response = await fetch(`${BASE_URL}/${data}/items`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const setUser = async data => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const setDeleteUser = async data => {
  try {
    await fetch(`${BASE_URL}/${data}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const setAddTodo = async(userId, todo) => {
  try {
    await fetch(`${BASE_URL}/${userId}/items`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
  } catch (error) {
    console.error(error);
  }
};

export const setDeleteTodo = async(userId, todoId) => {
  try {
    await fetch(`${BASE_URL}/${userId}/items/${todoId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const setCompleteToggle = async(userId, todoId) => {
  try {
    await fetch(`${BASE_URL}/${userId}/items/${todoId}/toggle`, {
      method: 'put',
    });
  } catch (error) {
    console.error(error);
  }
};
