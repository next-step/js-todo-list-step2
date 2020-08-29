import { validateTodoItems } from "../js/utils.js";

const BASE_URL = "https://blackcoffee-todolist.df.r.appspot.com/api/u";

const request = async (url, option) => {
  try {
    const res = await fetch(url, option);
    if (res.status !== 200) {
      throw new Error(`Error status code : ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    throw Error(error.message);
  }
};

const options = {
  POST: (contents) => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    };
  },
  DELETE: () => {
    return {
      method: "DELETE",
    };
  },
  TOGGLE: () => {
    return {
      method: "PUT",
    };
  },
  EDIT_CONTENTS: (contents) => {
    return {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    };
  },
  SET_PRIORITY: (priority) => {
    return {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priority }),
    };
  },
};

const fetchTodoUsers = async () => {
  try {
    return await request(BASE_URL);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const fetchTodoItemsByUserName = async (userName) => {
  try {
    const user = await request(`${BASE_URL}/${userName}/item`);
    validateTodoItems(user.todoList);
    return user.todoList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const addTodoItem = async (userName, textContents) => {
  try {
    const url = `${BASE_URL}/${userName}/item`;
    return await request(url, options.POST(textContents));
  } catch (error) {
    return { error: error.message };
  }
};

const deleteTodoItemById = async (userName, todoId) => {
  try {
    const url = `${BASE_URL}/${userName}/item/${todoId}`;
    return await request(url, options.DELETE());
  } catch (error) {
    return { error: error.message };
  }
};

const deleteAllTodoItems = async (userName) => {
  try {
    const url = `${BASE_URL}/${userName}/items`;
    return await request(url, options.DELETE());
  } catch (error) {
    return { error: error.message };
  }
};

const toggleTodoItemById = async (userName, todoId) => {
  try {
    const url = `${BASE_URL}/${userName}/item/${todoId}/toggle`;
    return await request(url, options.TOGGLE());
  } catch (error) {
    return { error: error.message };
  }
};

const editTodoItemContentsById = async (userName, todoId, textContents) => {
  try {
    const url = `${BASE_URL}/${userName}/item/${todoId}`;
    return await request(url, options.EDIT_CONTENTS(textContents));
  } catch (error) {
    return { error: error.message };
  }
};

const changeTodoItemPriorityById = async (userName, todoId, priority) => {
  try {
    const url = `${BASE_URL}/${userName}/item/${todoId}/priority`;
    return await request(url, options.SET_PRIORITY(priority));
  } catch (error) {
    return { error: error.message };
  }
};

const api = {
  fetchTodoUsers,
  fetchTodoItemsByUserName,
  addTodoItem,
  deleteTodoItemById,
  deleteAllTodoItems,
  toggleTodoItemById,
  editTodoItemContentsById,
  changeTodoItemPriorityById,
};

export default api;
