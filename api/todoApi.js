export const getTodoItems = async (userName) => {
  const response = await fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${userName}/item`
  );
  const todos = await response.json();
  return todos;
};

export const addTodoItem = async (userName, contents) => {
  const response = await fetch(
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
  );
  const todo = await response.json();
  return todo;
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
  const response = await fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${userName}/item/${itemId}`,
    {
      method: 'DELETE',
    }
  );
  const todo = await response.json();
  return todo;
};

export const toggleTodo = async (userName, itemId) => {
  const response = await fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${userName}/item/${itemId}/toggle`,
    {
      method: 'PUT',
    }
  );
  const todo = await response.json();
  return todo;
};
