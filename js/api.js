const BASE_URL = 'https://blackcoffee-todolist.df.r.appspot.com/api/u';

const fetchTodoList = async userName => {
  const response = await fetch(`${BASE_URL}/${userName}/item`);
  try {
    if (!response.ok) {
      throw new Error('[api] API를 확인해주세요.');
    }
    return await response.json();
  } catch {
    return { todoList: [] };
  }
};

const addNewTodoItem = async (userName, contents) => {
  const response = await fetch(`${BASE_URL}/${userName}/item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents
    })
  });

  if (!response.ok) {
    console.error('[api] API를 확인해주세요');
  }
};

const toggleItem = async (userName, itemId) => {
  const response = await fetch(`${BASE_URL}/${userName}/item/${itemId}/toggle`, {
    method: 'PUT'
  });

  try {
    if (!response.ok) {
      throw new Error('[api] API를 확인해주세요.');
    }
    return await response.json();
  } catch {
    return { todoList: [] };
  }
};

const deleteItem = async (userName, itemId) => {
  const response = await fetch(`${BASE_URL}/${userName}/item/${itemId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    console.error('[api] API를 확인해주세요.');
  }
};

const modifyItem = async (userName, itemId, contents) => {
  const response = await fetch(`${BASE_URL}/${userName}/item/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents
    })
  });

  if (!response.ok) {
    console.error('[api] API를 확인해주세요.');
  }
};

const fetchUserList = async () => {
  const response = await fetch(`${BASE_URL}`);
  return await response.json();
};

const api = {
  fetchTodoList,
  toggleItem,
  addNewTodoItem,
  deleteItem,
  fetchUserList,
  modifyItem
};

export default api;
