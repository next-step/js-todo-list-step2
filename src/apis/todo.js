import fetchApi from "./fetchApi.js";
const BASE_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/u";

export const getUserList = async () => {
  try {
    const response = await fetchApi(BASE_URL);
    const users = await response.json();
    return users;
  } catch (error) {
    throw Error(error.message);
  }
};

export const getTodosByUsername = async (username) => {
  try {
    const response = await fetchApi(`${BASE_URL}/${username}/item`);
    const todos = await response.json();

    return todos.todoList;
  } catch (error) {
    throw Error(error.message);
  }
};

export const addTodo = async (username, todo) => {
  try {
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
    const response = await fetchApi(`${BASE_URL}/${username}/item`, option);
    const addedTodo = await response.json();

    return addedTodo;
  } catch (error) {
    throw Error(error.message);
  }
};

export const deleteTodo = async (username, id) => {
  try {
    const option = { method: "DELETE" };
    const response = await fetchApi(
      `${BASE_URL}/${username}/item/${id}`,
      option
    );

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const toggleTodo = async (username, id) => {
  try {
    const option = { method: "PUT" };
    const response = await fetchApi(
      `${BASE_URL}/${username}/item/${id}/toggle`,
      option
    );

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const editTodoContents = async (username, id, contents) => {
  try {
    const newContents = {
      contents,
    };
    const option = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newContents),
    };
    const response = await fetchApi(
      `${BASE_URL}/${username}/item/${id}`,
      option
    );

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const changeTodoPriority = async (username, id, priority) => {
  try {
    priority = parseInt(priority);
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
    const response = await fetchApi(
      `${BASE_URL}/${username}/item/${id}/priority`,
      option
    );

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};
