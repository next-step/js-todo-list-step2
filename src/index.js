import { store } from "./modules/index.js";
import { runSaga } from "./core/redux-saga/index.js";
import { userSaga } from "./modules/user/index.js";
import { fetchGetUsers } from "./modules/user/actions.js";
import { TodoListTitle, UserList, TodoList, TodoInput, TodoBottom, Loading } from "./components/index.js";

class App {
  constructor() {
    const todoTitleTarget = document.querySelector('#user-title');
    const userListTarget = document.querySelector('#user-list-section');
    const todoInputTarget = document.querySelector('.new-todo');
    const todoListTarget = document.querySelector('.todo-list');
    const todoBottomTarget = document.querySelector('.count-container');
    const loadingTarget = document.querySelector('#loading');

    new TodoListTitle(todoTitleTarget);
    new UserList(userListTarget);
    new TodoInput(todoInputTarget);
    new TodoList(todoListTarget);
    new TodoBottom(todoBottomTarget);
    new Loading(loadingTarget);

    runSaga(store, userSaga);

    store.subscribe(() => {
      new TodoListTitle(todoTitleTarget);
      new UserList(userListTarget);
      new TodoInput(todoInputTarget);
      new TodoList(todoListTarget);
      new TodoBottom(todoBottomTarget);
      new Loading(loadingTarget);
    });

    store.dispatch(fetchGetUsers.REQUEST());
  }
}

new App();