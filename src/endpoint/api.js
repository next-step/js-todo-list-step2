import api, { setBaseURL } from './RestApi.js';

export const setApi = (baseURL) =>
  setBaseURL(baseURL);

export const getUserList = () =>
  api.GET('/api/users');

export const postUser = ({ name }) =>
  api.POST('/api/users', { name });

export const getUser = ({ userId }) =>
  api.GET(`/api/users/${ userId }`);

export const deleteUser = ({ userId }) =>
  api.DELETE(`/api/users/${ userId }`);

export const getUserItems = ({ userId }) =>
  api.GET(`/api/users/${ userId }/items`);

export const postUserItem = ({ userId, contents }) =>
  api.POST(`/api/users/${ userId }/items`, { contents });

export const deleteUserItemsAll = ({ userId }) =>
  api.DELETE(`/api/users/${ userId }/items`);

export const deleteUserItem = ({ userId, itemId }) =>
  api.DELETE(`/api/users/${ userId }/items/${ itemId }`);

export const putUserItem = ({ userId, itemId, contents }) =>
  api.PUT(`/api/users/${ userId }/items/${ itemId }`, { contents });

export const putUserItemPriority = ({ userId, itemId, priority }) =>
  api.PUT(`/api/users/${ userId }/items/${ itemId }`, { priority });
// "priority": "string" // 'NONE', 'FIRST', 'SECOND'

export const putUserItemCompleteToggle = ({ userId, itemId }) =>
  api.PUT(`/api/users/${ userId }/items/${ itemId }`);
