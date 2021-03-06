import $ from "../../utils/Selector.js";
import Key from "../../utils/Key.js";
import Validation from "../../utils/Validation.js";
import {persistTodoItem, requestTodoItemById} from "../../utils/APIs.js";

export default function TodoInput({refreshTodoList}) {
  this.$todoInput = $.single(".new-todo");

  const initEventListener = () => {
    this.$todoInput.addEventListener("keyup", persistItem);
  }

  const persistItem = async ({keyCode}) => {

    const {value: contents} = this.$todoInput
    if (Key.isNotEnter(keyCode)) return;
    if (Validation.isEmpty(contents)) return;

    const {_id} = this.$todoInput.dataset

    await persistTodoItem({_id , contents});
    const todoList = await requestTodoItemById(_id);
    refreshTodoList(todoList);

    this.$todoInput.value = "";
  }

  this.render = () => {
    initEventListener();
  }

  this.changeId = _id => {
    this._id = _id;
    this.$todoInput.dataset._id = _id;
  }
}