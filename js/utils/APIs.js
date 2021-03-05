import RequestAPI from "./Request.js";
import {USERS} from "./Urls.js";

export const requestUserList = async () => {
  return await RequestAPI.of(USERS.FIND_USERS).request();
}

export const addUser = async (message) => {
  return await RequestAPI.of({...USERS.PERSIST_USER, message }).request();
}

export const requestUserData = async id => {
  return await RequestAPI.of({...USERS.FIND_USER}).setData(":userId" , id).request();
}