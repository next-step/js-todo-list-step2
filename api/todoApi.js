export const getTodoItems = async (userName) => {
  const response = await fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${userName}/item`
  );
  const todos = await response.json();
  return todos;
};

export const addTodoItems = async (userName, contents) => {
  await fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${userName}/item/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
      }),
    }
  ).then((res) => res.json());
};

export const updateTodoItem = async (userName, itemId, contents) => {
  await fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${userName}/item/${itemId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
      }),
    }
  ).then((res) => res.json());
};

export const deleteTodoItem = async (userName, itemId) => {
  await fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${userName}/item/${itemId}`,
    {
      method: 'DELETE',
    }
  ).then((res) => res.json());
};

export const toggleTodo = async (userName, itemId) => {
  await fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${userName}/item/${itemId}/toggle`,
    {
      method: 'PUT',
    }
  );
};
