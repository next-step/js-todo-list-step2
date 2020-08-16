import { validateTodoItems, isValidTodoItems } from "../js/utils.js";

const API_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/u";

export const fetchTodoUsersFromServer = async () => {
  try {
    const res = await fetch(API_URL);
    return await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
};

export const fetchTodoItemsByUserNameFromServer = async (userName) => {
  try {
    const res = await fetch(`${API_URL}/${userName}/item`);
    const user = await res.json();
    validateTodoItems(user.todoList);
    return user.todoList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addTodoItem2Server = async (userName, textContext) => {
  try {
    const res = await fetch(`${API_URL}/${userName}/item`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: textContext,
      }),
    });
    return await res.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const deleteTodoItemByIdFromServer = async (userName, todoId) => {
  try {
    const res = await fetch(`${API_URL}/${userName}/item/${todoId}`, {
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const toggleTodoItmeByIdFromServer = async (userName, todoId) => {
  try {
    const res = await fetch(`${API_URL}/${userName}/item/${todoId}/toggle`, {
      method: "PUT",
    });
    return await res.json();
  } catch (error) {
    return { error: error.message };
  }
};

export const editTodoItemByIdFromServer = async (
  userName,
  todoId,
  textContext
) => {
  try {
    const res = await fetch(`${API_URL}/${userName}/item/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: textContext,
      }),
    });
    return await res.json();
  } catch (error) {
    return { error: error.message };
  }
};
