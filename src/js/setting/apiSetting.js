export const baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com';
export const uri = {
  GET_USERS: "/api/users",
  ADD_USER: "/api/users",
  GET_USER: "	/api/users/:userId",
  DELETE_USER: "/api/users/:userId",
  GET_USER_TODOITEMS: "/api/users/:userId/items/",
  ADD_USER_TODOITEM: "/api/users/:userId/items/",
  DELETE_USER_TODOITEMS: "/api/users/:userId/items/",
  DELETE_USER_TODOITEM: "/api/users/:userId/items/:itemId",
  UPDATE_USER_TODOITEM: "/api/users/:userId/items/:itemId",
  UPDATE_USER_TODOITEM_PRIORTY: "/api/users/:userId/items/:itemId/priority",
  UPDATE_USER_TODOITEM_COMPLETE: "/api/users/:userId/items/:itemId/toggle"
}