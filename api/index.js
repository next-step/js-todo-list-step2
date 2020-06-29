export function getTodoList(username) {
  return fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${username}/item`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function postTodoItem(username, contents) {
  return fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${username}/item/`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function deleteTodoItem(username, id) {
  fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${username}/item/${id}`,
    {
      method: 'DELETE',
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function toggleTodoItem(username, id) {
  return fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${username}/item/${id}/toggle`,
    {
      method: 'PUT',
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function editTodoItem(username, id, contents) {
  fetch(
    `https://blackcoffee-todolist.df.r.appspot.com/api/u/${username}/item/${id}/`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
      }),
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getUsers() {
  return fetch(`https://blackcoffee-todolist.df.r.appspot.com/api/u`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}
