const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';
const ADD_USER = '/api/users';
const GET_USERS = '/api/users';
const GET_USER = '/api/users/';
const DELETE_USER = '/api/users/';

const addUser = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}${ADD_USER}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (err) {
    alert('addUser fail');
    return err;
  }
};

const getUsers = async () => {
  try {
    const response = await fetch(`${BASE_URL}${GET_USERS}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (err) {
    alert('getUsers fail');
    return err;
  }
};

const getUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}${GET_USER}${userId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (err) {
    alert('getUser fail');
    return err;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}${DELETE_USER}${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (err) {
    alert('deleteUser fail');
    return err;
  }
};

export default {
  addUser,
  getUsers,
  getUser,
  deleteUser,
};
