import RequestAPI from "./Request.js";
import {USERS, ITEMS} from "./Urls.js";

// User 전체 리스트 조회
export const requestUserList = async () => {
  return await RequestAPI.of(USERS.FIND_USERS)
    .request();
}

// User 등록
export const addUser = async (message) => {
  return await RequestAPI.of({...USERS.PERSIST_USER, message})
    .request();
}

// User 데이터 조회
export const requestUserData = async id => {
  return await RequestAPI.of({...USERS.FIND_USER})
    .setData(":userId", id)
    .request();
}

// TodoItem 등록
export const persistTodoItem = async ({_id, contents}) => {
  return await RequestAPI.of({...ITEMS.PERSIST_ITEM, message: {contents}})
    .setData(":userId", _id)
    .request();
}

// _id 로 TodoItem 조회
export const requestTodoItemById = async _id => {
  return await RequestAPI.of({...ITEMS.FIND_ITEMS})
    .setData(":userId", _id)
    .request();
}

// contents 업데이트
export const updateContent = async ({_id, _itemId, contents}) => {
  return await RequestAPI.of({...ITEMS.UPDATE_ITEM_CONTENTS, message : {contents}})
    .setData(":userId", _id)
    .setData(":itemId", _itemId)
    .request();
}

export const removeAllTodoItem = async _id => {
  return await RequestAPI.of({...ITEMS.REMOVE_ITEMS})
    .setData(":userId", _id)
    .request();
}