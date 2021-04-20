const BASE_URL = 'https://js-todo-list-9ca3a.df.r.appspot.com';

export const POST_USER_URL = () => `${BASE_URL}/api/users`;

export const GET_USER_LIST_URL = () => `${BASE_URL}/api/users`;

export const GET_USER_URL = (id) => `${BASE_URL}/api/user${id}`;
