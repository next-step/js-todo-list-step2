import { ADD_USER_TODOITEM, DELETE_USER_TODOITEM, DELETE_USER_TODOITEMS, GET_USER_TODOITEMS, UPDATE_USER_TODOITEM, UPDATE_USER_TODOITEM_COMPLETE } from "../../setting/api.js";
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

  this.complete = async id => {
    await UPDATE_USER_TODOITEM_COMPLETE(activeUser.getId(), id);
    this.render();
  }

  this.delete = async id => {
    await DELETE_USER_TODOITEM(activeUser.getId(), id);
    this.render();
  }

  this.deleteAll = async () => {
    await DELETE_USER_TODOITEMS(activeUser.getId());
    this.render();
  }

  this.editing = async id => {
    await this.render();
    todoList.editing(id);
  }

  this.edit = async (id, content) => {
    await UPDATE_USER_TODOITEM(activeUser.getId(), id, content);
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