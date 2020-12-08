import { store } from "./modules/index.js";
import { runSaga } from "./core/redux-saga/index.js";
import { userSaga } from "./modules/user/index.js";
import { fetchGetUsers } from "./modules/user/actions.js";
import { UserList, TodoList, TodoInput } from "./components/index.js";

class App {
  constructor() {
    const userListTarget = document.querySelector('#user-list-section');
    const todoInputTarget = document.querySelector('.new-todo');
    const todoListTarget = document.querySelector('.todo-list');

    new UserList(userListTarget);
    new TodoInput(todoInputTarget);
    new TodoList(todoListTarget);

    runSaga(store, userSaga).then(r => r);

    store.subscribe(() => {
      console.log("state: ", store.getState());
      new UserList(userListTarget);
      new TodoInput(todoInputTarget);
      new TodoList(todoListTarget);
    });

    store.dispatch(fetchGetUsers.REQUEST());
  }
}

new App();