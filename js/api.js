export const fetchUserListFromServer = async () => {
  try {
    const res = await fetch(
      "https://blackcoffee-todolist.df.r.appspot.com/api/u",
      {
        method: "GET",
      }
    );
    const userList = await res.json();
    return userList;
  } catch {}
};

const request = async (url, option) => {
  try {
    const response = await fetch(url, option);
    return await response.json();
  } catch {}
};

const options = {
  POST: (text) => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: text,
      }),
    };
  },
};

const api = {
  addTodoFromAPI: async (username, text) =>
    request(
      `https://blackcoffee-todolist.df.r.appspot.com/api/u/${username}/item/`,
      options.POST(text)
    ),
  fetchTodoItemsFromAPI: async (username) => {
    const res = await request(
      `https://blackcoffee-todolist.df.r.appspot.com/api/u/${username}/item/`
    );
    return res.todoList || [];
  },
};

export default api;
