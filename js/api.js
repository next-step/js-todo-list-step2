const BASE_URL = 'https://blackcoffee-todolist.df.r.appspot.com/api/u';

const responseHandler = async request => {
  const response = await request();
  if (!response.ok) {
    // 200~299 코드 확인
    throw new Error('[api] API를 확인해주세요.');
  }
  return await response.json();
};

const fetchTodoInfo = async userName => {
  try {
    return await responseHandler(() => {
      return fetch(`${BASE_URL}/${userName}/item`);
    });
  } catch (e) {
    console.error(e);
    return { todoList: [] };
  }
};

const addNewTodoItem = async (userName, contents) => {
  try {
    return await responseHandler(() => {
      return fetch(`${BASE_URL}/${userName}/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents
        })
      });
    });
  } catch (e) {
    console.error(e);
  }
};

const toggleItem = async (userName, itemId) => {
  try {
    return await responseHandler(() => {
      return fetch(`${BASE_URL}/${userName}/item/${itemId}/toggle`, {
        method: 'PUT'
      });
    });
  } catch (e) {
    console.error(e);
    return { todoList: [] };
  }
};

const deleteItem = async (userName, itemId) => {
  try {
    return await responseHandler(() => {
      return fetch(`${BASE_URL}/${userName}/item/${itemId}`, {
        method: 'DELETE'
      });
    });
  } catch (e) {
    console.error(e);
  }
};

const modifyItem = async (userName, itemId, contents) => {
  try {
    return await responseHandler(() => {
      return fetch(`${BASE_URL}/${userName}/item/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents
        })
      });
    });
  } catch (e) {
    console.error(e);
  }
};

const fetchUserList = async () => {
  try {
    return await responseHandler(() => {
      return fetch(`${BASE_URL}`);
    });
  } catch (e) {
    console.error(e);
    return [];
  }
};

const api = {
  fetchTodoInfo,
  toggleItem,
  addNewTodoItem,
  deleteItem,
  fetchUserList,
  modifyItem
};

export default api;
