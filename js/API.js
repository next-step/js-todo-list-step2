import {ADDRESS, DEFAULT_USER} from './constants.js';

export const API = {
  GetUsers: async () => {
    try{
      const response = await fetch(`${ADDRESS}/api/users`, ApiOptions.GET);
      return await response.json();
    } catch {
      return DEFAULT_USER.json();
    }
  },
  AddUser: async (userName) => {
    await fetch(`${ADDRESS}/api/users`, ApiOptions.POST({name: userName}));
  },
  GetTodoItems: async (userId) => {
    try{
      const response = await fetch(`${ADDRESS}/api/users/${userId}/items`, ApiOptions.GET);
      if (response.ok)
        return await response.json();
      return [];
    } catch {
      return [];
    }
  },
  AddItem: async (userId, contentText) => {
    await fetch(`${ADDRESS}/api/users/${userId}/items`, ApiOptions.POST( {contents: contentText} ));
  },
  DeleteItem: async (userId, itemId) => {
    await fetch(`${ADDRESS}/api/users/${userId}/items/${itemId}`, ApiOptions.DELETE);
  },
  ToggleItem: async (userId, itemId) => {
    await fetch(`${ADDRESS}/api/users/${userId}/items/${itemId}/toggle`, ApiOptions.TOGGLE);
  },
  EditItem: async (userId, itemId, newContentText) => {
    await fetch(`${ADDRESS}/api/users/${userId}/items/${itemId}`, ApiOptions.EDIT({contents: newContentText}));
  }
};

export const ApiOptions = {
  POST: (data) => {
    return {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
  },
  GET: () => {
    return {
      method: 'GET',
    };
  },
  DELETE: () => {
    return {
      method: 'DELETE',
    };
  },
  TOGGLE: () => {
    return {
      method: 'PUT',
    };
  },
  EDIT: (data) => {
    return {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    };
  },
};
