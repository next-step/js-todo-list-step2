export const API = {
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
      headers: {'Content-Type': 'application/json'},
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
      body: JSON.stringify(data)};
  },
};
