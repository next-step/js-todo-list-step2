import { ADD_USER_TODOITEM, GET_USER_TODOITEMS } from "../../setting/api.js";
import { checkNull } from "../../utils/stringUtils.js";
import TodoInput from "./todoInput.js";
import { parseItem, TodoItem } from "./todoItem.js";
import TodoList from "./todoList.js";

export default function TodoApp() {
  const todoList = new TodoList(this);
  new TodoInput(this);
  let todoItems = [];
  let activeUser;

  this.render = async () => {
    const userTodoItem = checkNull(activeUser) ? [] : await GET_USER_TODOITEMS(activeUser.getId());
    todoItems = userTodoItem.map(item => parseItem(item));

    todoList.render(todoItems);
  }

  this.add = async content => {
    await ADD_USER_TODOITEM(activeUser.getId(), content);
    this.render();
  }

  this.complete = id => {
    todoItems.find(item => item.matchId(id)).complete();
    this.render();
  }

  this.delete = id => {
    const index = todoItems.findIndex(item => item.matchId(id));
    todoItems.splice(index, 1);
    this.render();
  }

  this.deleteAll = () => {
    todoItems.splice(0, todoItems.length);
    this.render();
  }

  this.editing = id => {
    this.render();
    todoList.editing(id);
  }

  this.edit = (id, content) => {
    todoItems.find(item => item.matchId(id)).changeContent(content);
    this.render();
  }

  this.changePriority = (id, priority) => {
    todoItems.find(item => item.matchId(id)).changePriority(priority);
    this.render();
  }

  this.init = user => {
    activeUser = user;
    this.render();
  }
}