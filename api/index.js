const BASE_URL = 'https://blackcoffee-todolist.df.r.appspot.com/api/u';
export async function getTodoList(username) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/item`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function postTodoItem(username, contents) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/item/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contents }),
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodoItem(username, id) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/item/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function toggleTodoItem(username, id) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/item/${id}/toggle`, {
      method: 'PUT',
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function editTodoItem(username, id, contents) {
  try {
    const response = await fetch(`${BASE_URL}/${username}/item/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents,
      }),
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers() {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(response.status);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
