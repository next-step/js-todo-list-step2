import Hermes from '../lib/hermes/Hermes';

export const SERVER_URI =
  'https://js-todo-list-9ca3a.df.r.appspot.com/api/users/';

export default Hermes.create({
  baseURL: SERVER_URI,
  timeout: 3000,
});
