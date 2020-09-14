import RestApi from './RestApi.js';

let api;

export const setApi = (baseURL) => api = RestApi(baseURL);

export const getUserList = () => api.GET({ uri: '/api/users' });

export const postUser = ({ name }) => api.POST({ uri: '/api/users', body: { name } });

export const getUser = ({ userId }) => api.GET({ uri: `/api/users/${ userId }` });

export const deleteUser = ({ userId }) => api.DELETE({ uri: `/api/users/${ userId }` });

export const getUserItems = ({ userId }) => api.GET({ uri: `/api/users/${ userId }/items` });

export const postUserItem = ({ userId, contents }) => api.POST({
  uri: `/api/users/${ userId }/items`,
  body: { contents },
});

export const deleteUserItemsAll = ({ userId }) => api.DELETE({ uri: `/api/users/${ userId }/items` });

export const deleteUserItem = ({ userId, itemId }) => api.DELETE({ uri: `/api/users/${ userId }/items/${ itemId }` });

export const putUserItem = ({ userId, itemId, contents }) => api.PUT({
  uri: `/api/users/${ userId }/items/${ itemId }`,
  body: { contents },
});

export const putUserItemPriority = ({ userId, itemId, priority }) => api.PUT({
  uri: `/api/users/${ userId }/items/${ itemId }`,
  body: { priority },
});  // "priority": "string" // 'NONE', 'FIRST', 'SECOND'

export const putUserItemCompleteToggle = ({ userId, itemId }) => api.PUT({
  uri: `/api/users/${ userId }/items/${ itemId }`,
  body: {},
});
