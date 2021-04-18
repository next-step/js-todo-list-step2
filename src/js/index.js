import { TodoApp } from "./app/TodoApp.js";
import { TodoList, TodoStatusContainer, TodoInput } from "./component/todo/Todo.js";
import { UserList } from "./component/user/UserList.js";
import { $ } from "./util/domSelection.js";

const todoApp = new TodoApp();
const todoList = new TodoList(todoApp);
const todoInput = new TodoInput(todoApp);
const todoStatusContainer = new TodoStatusContainer(todoApp);
const userList = new UserList(todoApp);
todoApp.todoList = todoList;
todoApp.todoInput = todoInput;
todoApp.todoStatusContainer = todoStatusContainer;
todoApp.userList = userList;
todoApp.init();

