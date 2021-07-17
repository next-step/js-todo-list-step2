import UserStore from "./store/UserStore.js";
import TodoStore from "./store/TodoStore.js";
import UserList from "./components/user/UserList.js";
import UserTitle from "./components/user/UserTitle.js";
import { $ } from "./utils/utils.js";
import { getUserList, getUserTodoList } from "./api/api.js";
// import Component from "./core/Component.js";

const App = async () => {
  const initialUserData = await getUserList();
  const { _id, name, todoList } = initialUserData[0];
  console.log(initialUserData);
  const userStore = new UserStore(initialUserData, name);
  const todoStore = new TodoStore(todoList);

  /**
   * @param {string} id
   */
  const setTodoStore = async (id = _id) => {
    const todoListData = await getUserTodoList(id);
    // todoStore.setTodoList(todoListData);
  };

  setTodoStore();

  const userTitle = new UserTitle($("#user-title"), userStore);
  const userList = new UserList($("#user-list"), userStore, {
    setTodoStore,
  });

  [userTitle, userList].forEach((component) => userStore.subscribe(component));
};

export default App;
