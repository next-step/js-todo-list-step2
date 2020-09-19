import createStore from "./redux.js";
import reducer, {setStatus, setApp} from "./reducer.js";
import UserTitleContainer from "./container/UserTitleContainer.js";
import UserListContainer from "./container/UserListContainer.js";
import TodoListContainer from "./container/TodoListContainer.js";
import {getTodoApp} from "./api/index.js";
import {PENDING} from "./constant.js";
import InputContainer from "./container/InputContainer.js";

const store = createStore(reducer);

const $userTitle = document.querySelector('#user-title');
const userTitle = UserTitleContainer($userTitle, store);
store.subscribe(userTitle);

const $userList = document.querySelector('#user-list');
const userList = UserListContainer($userList, store);
store.subscribe(userList);

const $todoList = document.querySelector('.main');
const todoList = TodoListContainer($todoList, store);
store.subscribe(todoList);

const $input = document.querySelector('.new-todo');
InputContainer($input, store);

store.subscribe(()=>console.log(store.getState()));


(async function () {
  store.dispatch(setStatus({status:PENDING}));
  const todoApp = await getTodoApp();
  store.dispatch(setApp(todoApp));
})();