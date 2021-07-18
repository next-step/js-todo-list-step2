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
  const userStore = new UserStore(initialUserData, { _id, name });
  const todoStore = new TodoStore(todoList);

  /**
   * @param {string} id
   */
  const setTodoList = async (id = _id) => {
    const todoListData = await getUserTodoList(id);
    console.log(todoListData);
    // todoStore.setTodoList(todoListData);
  };

  // setTodoList();

  const userTitle = new UserTitle($("#user-title"), userStore);
  const userList = new UserList($("#user-list"), userStore, {
    setTodoList: setTodoList.bind(this),
  });

  [userTitle, userList].forEach((component) => userStore.subscribe(component));
};

export default App;
