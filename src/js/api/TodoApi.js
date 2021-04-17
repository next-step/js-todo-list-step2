const ENDPOINT = 'https://js-todo-list-9ca3a.df.r.appspot.com';

const request = async (url) => {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (e) {
    console.warn(e);
  }
};

export const api = {
  getUser: () => {
    return request(`${ENDPOINT}/api/users`);
  },
};
