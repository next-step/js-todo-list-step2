import { TodoApp } from "./app/TodoApp.js";
import { TodoList, TodoStatusContainer } from "./component/todo/Todo.js";
import { UserList } from "./component/user/UserList.js";

const todoApp = new TodoApp([]);
const todoList = new TodoList(todoApp);
const todoStatusContainer = new TodoStatusContainer();
const userList = new UserList(todoApp);
todoApp.todoList = todoList;
todoApp.todoStatusContainer = todoStatusContainer;
todoApp.userList = userList;
todoApp.init();


