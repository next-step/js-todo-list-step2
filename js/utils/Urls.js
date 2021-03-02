const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";
const buildURL = ({url, method}) => ({"url": `${BASE_URL}${url}`, method});

// users
const USERS_API = "/api/users";
const USERS_BY_ID_API = "/api/users/:userId";

// items
const ITEMS_BY_USER_ID_API = "/api/users/:userId/items";
const ITEMS_BY_USER_ID_AND_ITEM_ID_API = "/api/users/:userId/items/:itemId";

// item priority
const ITEM_PRIORITY_API = "/api/users/:userId/items/:itemId/priority";

// item complete
const ITEM_COMPLETE_API = "/api/users/:userId/items/:itemId/toggle";

export const METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
}

export const USERS = {

  FIND_USER: buildURL({url: USERS_BY_ID_API, method: METHOD.GET}),
  FIND_USERS: buildURL({url: USERS_API, method: METHOD.GET}),
  PERSIST_USER: buildURL({url: USERS_API, method: METHOD.POST}),
  WITHDRAWAL_USER_BY_ID: buildURL({url: USERS_BY_ID_API, method: METHOD.DELETE}),
}

// _BY_USER_ID
export const ITEMS = {
  FIND_ITEMS: buildURL({url: ITEMS_BY_USER_ID_API, method: METHOD.GET}),
  PERSIST_ITEM: buildURL({url: ITEMS_BY_USER_ID_API, method: METHOD.POST}),
  REMOVE_ITEM: buildURL({url: ITEMS_BY_USER_ID_AND_ITEM_ID_API, method: METHOD.DELETE}),
  REMOVE_ITEMS: buildURL({url: ITEMS_BY_USER_ID_API, method: METHOD.DELETE}),
  UPDATE_ITEM_CONTENTS: buildURL({url: ITEMS_BY_USER_ID_AND_ITEM_ID_API, method: METHOD.PUT}),
  CHANGE_PRIORITY: buildURL({url: ITEM_PRIORITY_API, method: METHOD.PUT}),
  COMPLETE_ITEM: buildURL({url: ITEM_COMPLETE_API, method: METHOD.PUT}),
}