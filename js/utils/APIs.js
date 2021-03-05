import RequestAPI from "./Request.js";
import {USERS, ITEMS} from "./Urls.js";

export const requestUserList = async () => {
  return await RequestAPI.of(USERS.FIND_USERS)
    .request();
}

export const addUser = async (message) => {
  return await RequestAPI.of({...USERS.PERSIST_USER, message })
    .request();
}

export const requestUserData = async id => {
  return await RequestAPI.of({...USERS.FIND_USER})
    .setData(":userId" , id)
    .request();
}

export const persistTodoItem = async ({_id , contents}) => {
  return await RequestAPI.of({...ITEMS.PERSIST_ITEM, message:{contents}})
    .setData(":userId", _id)
    .request();
}

export const requestTodoItemById = async _id => {
  return await RequestAPI.of({...ITEMS.FIND_ITEMS})
    .setData(":userId", _id)
    .request();
}