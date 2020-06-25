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
    throw new Error('[api] API를 확인해주세요');
  }
};

const toggleItem = async (userName, itemId) => {
  const response = await fetch(`${BASE_URL}/${userName}/item/${itemId}/toggle`, {
    method: 'PUT'
  });
  if (!response.ok) {
    throw new Error('[api] API를 확인해주세요.');
  }
  try {
    return await response.json();
  } catch {
    return { todoList: [] };
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
  fetchUserList
};

export default api;
