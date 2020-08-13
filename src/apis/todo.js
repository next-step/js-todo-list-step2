const BASE_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/u";

// todo: 에러 발생 처리 한곳에서 하게
export const getUserList = async () => {
  const response = await fetch(BASE_URL);
  const users = await response.json();
  return users;
};

export const getTodoByUsername = async (username) => {
  const response = await fetch(`${BASE_URL}/${username}/item`);
  const todos = await response.json();

  return todos.todoList;
};

export const addTodo = async (username, todo) => {
  const newTodo = {
    contents: todo,
  };

  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  };

  const response = await fetch(`${BASE_URL}/${username}/item`, option);
  const addedTodo = await response.json();

  return addedTodo;
};

export const deleteTodoById = async (username, id) => {
  const option = { method: "DELETE" };
  const response = await fetch(`${BASE_URL}/${username}/item/${id}`, option);

  return response;
};

export const toggleTodoById = async (username, id) => {
  const option = { method: "PUT" };

  const response = await fetch(
    `${BASE_URL}/${username}/item/${id}/toggle`,
    option
  );

  return response;
};

export const changeTodoPriority = async (username, id, priority) => {
  const newPriority = {
    priority,
  };

  const option = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPriority),
  };

  const response = await fetch(
    `${BASE_URL}/${username}/item/${id}/priority`,
    option
  );

  return response;
};
