const ROOT = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const postUser = (userName) => {
  const requestBody = JSON.stringify({
    name: userName,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  };
  return fetch(`${ROOT}/api/users`, options)
    .then((res) => {
      if (!res.ok) return new Error(res.status);
      return res.json();
    })
    .then((post) => {
      return {
        _id: post._id,
        name: post.name,
      };
    });
};
export const deleteUser = (userID) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${ROOT}/api/users/${userID}`, options);
};

export const getTodoItems = (userID) => {
  return fetch(`${ROOT}/api/users/${userID}/items/`)
    .then((res) => {
      if (!res.ok) return new Error(res.status);
      return res.json();
    })
    .then((todoList) => {
      return todoList;
    });
};

export const postTodoItem = (userID, contents) => {
  const requestBody = JSON.stringify({
    contents,
  });
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  };
  return fetch(`${ROOT}/api/users/${userID}/items/`, options)
    .then((res) => {
      if (!res.ok) return new Error(res.status);
      return res.json();
    })
    .then((post) => {
      console.log(post);
    });
};

export const deleteTodoItems = (userID) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${ROOT}/api/users/${userID}/items/`, options);
};

export const deleteTodoItem = (userID, itemID) => {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(`${ROOT}/api/users/${userID}/items/${itemID}`, options);
};
export const reviseTodoItem = (userID, itemID, contents) => {
  const requestBody = JSON.stringify({
    contents,
  });
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  };

  fetch(`${ROOT}/api/users/${userID}/items/${itemID}`, options).then((res) => {
    if (!res.ok) return new Error(res.status);
    console.log(res);
  });
};
export const revisePriorityOfTodoItem = (userID, itemID, priority) => {
  const requestBody = JSON.stringify({
    priority,
  });
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  };
  fetch(`${ROOT}/api/users/${userID}/items/${itemID}/priority`, options);
};
export const toggleCompleteOfTodoItem = (userID, itemID) => {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`${ROOT}/api/users/${userID}/items/${itemID}/toggle`, options);
};
