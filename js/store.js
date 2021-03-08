const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
//let _currentUser = {}; 로 뒀을시,
//setCurrentUser -> getTodoList 순서로 호출시 여전히 {}로 남아있는 문제
let _currentUserId = '';

const store = () => {
  const setCurrentUser = (userId) => {
    _currentUserId = userId;
  };

  const getUser = (userId) => {
    return fetch(BASE_URL + '/api/users/' + userId)
      .then((response) => {
        if (!response.ok) {
          return new Error(response);
        }
        return response.json();
      })
      .then((user) => {
        return user;
      });
  };

  const getUsers = () => {
    return fetch(BASE_URL + '/api/users').then((response) => {
      if (!response.ok) {
        return new Error(response);
      }
      return response.json();
    });
  };

  const createUser = (name) => {
    return fetch(BASE_URL + '/api/users', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ name }),
    }).then((response) => {
      if (!response.ok) {
        return new Error(response);
      }

      return response.json();
    });
  };

  const deleteUser = () => {
    return fetch(BASE_URL + '/api/users/' + _currentUserId, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        return new Error(response);
      }

      _currentUserId = '';
    });
  };

  function getTodoList() {
    // return fetch(BASE_URL + `/api/users/${userId}/items`).then((response) => {
    return fetch(BASE_URL + `/api/users/${_currentUserId}/items`).then(
      (response) => {
        if (!response.ok) {
          return new Error(response);
        }
        return response.json();
      }
    );
  }

  function createTodo(contents) {
    return fetch(BASE_URL + `/api/users/${_currentUserId}/items`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ contents }),
    }).then((response) => {
      if (!response.ok) {
        return new Error(response);
      }

      //   {
      //     "_id": "GvDA7CBpd",
      //     "contents": "test",
      //     "priority": "NONE",
      //     "isCompleted": false
      // }
      return response.json();
    });
  }

  function deleteTodo(todoId) {
    return fetch(BASE_URL + `/api/users/${_currentUserId}/items/${todoId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
    }).then((response) => {
      if (!response.ok) {
        return new Error(response);
      }

      return response.json();
    });
  }

  function updateTodoContents(todoId, contents) {
    return fetch(BASE_URL + `/api/users/${_currentUserId}/items/${todoId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PUT',
      body: JSON.stringify({ contents }),
    }).then((response) => {
      if (!response.ok) {
        return new Error(response);
      }

      return response.json();
    });
  }

  function updateTodoPriority(todoId, priority) {
    return fetch(
      BASE_URL + `/api/users/${_currentUserId}/items/${todoId}/priority`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({ priority }),
      }
    ).then((response) => {
      if (!response.ok) {
        return new Error(response);
      }

      return response.json();
    });
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
    setUser(userId) {
      setCurrentUser(userId);
      return getUser(userId); //TODO
    },
    getUsers,
    createUser,
    deleteUser,
    getTodoList,
    createTodo,
    deleteTodo,
    updateTodoContents,
    updateTodoPriority,
    updateTodoToggle,
  };
};

export default store;
