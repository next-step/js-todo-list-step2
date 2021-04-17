import { TodoApp } from "./app/TodoApp.js";
import { TodoList, TodoStatusContainer } from "./component/todo/Todo.js";
import { UserList } from "./component/user/UserList.js";
import { $ } from "./util/domSelection.js";

const todoApp = new TodoApp();
const todoList = new TodoList(todoApp);
const todoStatusContainer = new TodoStatusContainer();
const userList = new UserList(todoApp);
todoApp.todoList = todoList;
todoApp.todoStatusContainer = todoStatusContainer;
todoApp.userList = userList;
todoApp.init();

const newTodoInput = $("input.new-todo");
newTodoInput.addEventListener("keydown",async function (e){
    if (e.key == "Enter") {
    await todoApp.addItem(newTodoInput.value);
    newTodoInput.value = "";
    }
});
