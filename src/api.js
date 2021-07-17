const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com/api';

export const getUsersList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users`);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const setUser = async data => {
  try {
    const response = await fetch(`${BASE_URL}/users`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const getUser = async data => {
  try {
    const response = await fetch(`${BASE_URL}/users/${data}`);
    console.log(response.body);
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const setDeleteUser = async data => {
  try {
    await fetch(`${BASE_URL}/users/${data}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
  }
};
