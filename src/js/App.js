import UserStore from "./store/UserStore.js";
import TodoStore from "./store/TodoStore.js";
import UserList from "./components/user/UserList.js";
import UserTitle from "./components/user/UserTitle.js";
import TodoList from "./components/todo/TodoList.js";
import TodoCount from "./components/todo/TodoCount.js";
import TodoFilter from "./components/todo/TodoFilter.js";
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
    todoStore.setTodoList(todoListData);
    todoStore.notifyObservers();
  };

  // setTodoList();

  const userTitleView = new UserTitle($("#user-title"), userStore);
  const userListView = new UserList($("#user-list"), userStore, {
    setTodoList: setTodoList.bind(this),
  });

  [userTitleView, userListView].forEach((component) => userStore.subscribe(component));

  const todoListView = new TodoList($(".todo-list"), todoStore);
  const todoCountView = new TodoCount($(".todo-count"), todoStore);
  const todoFilterView = new TodoFilter($(".filters"), todoStore);

  [todoListView, todoCountView, todoFilterView].forEach((component) => todoStore.subscribe(component));
};

export default App;
