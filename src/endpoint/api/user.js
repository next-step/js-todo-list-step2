import api from '../RestApi.js';

const userAPI = '/api/users';

export const getUserList = () => (
  api.GET(
    userAPI,
  )
);

export const postUser = ({ name }) => (
  api.POST(
    userAPI,
    { name },
  )
);

export const getUser = ({ userId }) => (
  api.GET(
    `${userAPI}/${userId}`,
  )
);

export const deleteUser = ({ userId }) => (
  api.DELETE(
    `${userAPI}/${userId}`,
  )
);

export const getUserTodoList = ({ userId }) => (
  api.GET(
    `${userAPI}/${userId}/items`,
  )
);

export const postUserTodoItem = ({ userId, contents }) => (
  api.POST(
    `${userAPI}/${userId}/items`,
    { contents },
  )
);

export const deleteUserTodoItemsAll = ({ userId }) => (
  api.DELETE(
    `${userAPI}/${userId}/items`,
  )
);

export const deleteUserTodoItem = ({ userId, itemId }) => (
  api.DELETE(
    `${userAPI}/${userId}/items/${itemId}`,
  )
);

export const putUserTodoItem = ({ userId, itemId, contents }) => (
  api.PUT(
    `${userAPI}/${userId}/items/${itemId}`,
    { contents })
);

export const putUserTodoItemPriority = ({ userId, itemId, priority }) => (
  api.PUT(
    `${userAPI}/${userId}/items/${itemId}/priority`,
    { priority },
  )
);

export const putUserTodoItemCompleteToggle = ({ userId, itemId }) => (
  api.PUT(
    `${userAPI}/${userId}/items/${itemId}/toggle`)
);

