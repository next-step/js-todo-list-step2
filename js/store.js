const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
let _currentUserId = '';

const _catchHTTPStatusError = (fn) => {
  return (...args) => {
    return fn(...args).then((response) => {
      if (!response.ok) {
        return new Error(response);
      }
      return response.json();
    });
  };
};

const REQUEST_OPTIONS = (body) => {
  return {
    post: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    },
    put: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify(body),
    },
    delete: {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    },
  };
};

const userStore = () => {
  const setCurrentUser = (userId) => {
    _currentUserId = userId; //TODO
  };

  const getUser = async (userId) => {
    const wrappedFunction = _catchHTTPStatusError(() =>
      fetch(BASE_URL + '/api/users/' + userId)
    );
    return wrappedFunction();
  };

  const getUsers = async () => {
    const wrappedFunction = _catchHTTPStatusError(() =>
      fetch(BASE_URL + '/api/users')
    );

    return wrappedFunction();
  };

  const createUser = async (name) => {
    const requestBody = { name };
    const wrappedFunction = _catchHTTPStatusError(() =>
      fetch(BASE_URL + '/api/users', REQUEST_OPTIONS(requestBody).post)
    );

    return wrappedFunction();
  };

  const deleteUser = async () => {
    const wrappedFunction = _catchHTTPStatusError(() =>
      fetch(BASE_URL + '/api/users/' + _currentUserId, REQUEST_OPTIONS().delete)
    );

    await wrappedFunction();
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
    const wrappedFunction = _catchHTTPStatusError(() =>
      fetch(BASE_URL + `/api/users/${_currentUserId}/items`)
    );
    return wrappedFunction();
  };

  const createTodo = async (contents) => {
    const requestBody = { contents };
    const wrappedFunction = _catchHTTPStatusError(() =>
      fetch(
        BASE_URL + `/api/users/${_currentUserId}/items`,
        REQUEST_OPTIONS(requestBody).post
      )
    );

    return wrappedFunction();
  };

  const deleteTodo = async (todoId) => {
    const wrappedFunction = _catchHTTPStatusError(() =>
      fetch(
        BASE_URL + `/api/users/${_currentUserId}/items/${todoId}`,
        REQUEST_OPTIONS().delete
      )
    );
    await wrappedFunction();
  };

  function updateTodoContents(todoId, contents) {
    const requestBody = { contents };
    const wrappedFunction = _catchHTTPStatusError(() =>
      fetch(
        BASE_URL + `/api/users/${_currentUserId}/items/${todoId}`,
        REQUEST_OPTIONS(requestBody).put
      )
    );

    return wrappedFunction();
  }

  function updateTodoToggle(todoId) {
    return fetch(
      BASE_URL + `/api/users/${_currentUserId}/items/${todoId}/toggle`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
      }
    ).then((response) => {
      if (!response.ok) {
        return new Error(response);
      }

      return response.json();
    });
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
