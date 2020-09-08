import fetchApi from "./fetchApi.js";
const BASE_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/u";

export const getUserList = async () => {
  try {
    const users = await fetchApi.get(BASE_URL);
    return users;
  } catch (error) {
    throw Error(error.message);
  }
};

export const getTodosByUsername = async (username) => {
  try {
    const todos = await fetchApi.get(`${BASE_URL}/${username}/item`);

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
    const addedTodo = await fetchApi.post(
      `${BASE_URL}/${username}/item`,
      JSON.stringify(newTodo)
    );

    return addedTodo;
  } catch (error) {
    throw Error(error.message);
  }
};

export const deleteTodo = async (username, id) => {
  try {
    const response = await fetchApi.delete(
      `${BASE_URL}/${username}/item/${id}`
    );

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const deleteAllTodo = async (username) => {
  try {
    const response = await fetchApi.delete(`${BASE_URL}/${username}/items`);

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};

export const toggleTodo = async (username, id) => {
  try {
    const response = await fetchApi.put(
      `${BASE_URL}/${username}/item/${id}/toggle`
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

    const response = await fetchApi.put(
      `${BASE_URL}/${username}/item/${id}`,
      JSON.stringify(newContents)
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

    const response = await fetchApi.put(
      `${BASE_URL}/${username}/item/${id}/priority`,
      JSON.stringify(newPriority)
    );

    return response;
  } catch (error) {
    throw Error(error.message);
  }
};
