const userAPI = '/api/users';

export const user = ({ userId }) => {
  let uri = userAPI;
  if (userId) uri += `/${userId}`

  return uri;
};

export const userTodoItem = (userId, { itemId, priority, toggle }) => {
  let uri = `userAPI/${userId}/items`;
  if (itemId) uri += `/${itemId}`;
  if (priority) uri += '/priority'
  if (toggle) uri += '/toggle';

  return uri;
};

