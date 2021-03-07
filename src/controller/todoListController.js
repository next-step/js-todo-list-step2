'use strict';

import { todoListView } from '../view/todoListView.js';
import { userStore } from '../model/userStore.js';
import { $ } from '../utils/dom.js';
import { API } from '../api/api.js';
import { ElementValidator, KeyValidator } from '../validator/validator.js';
import { DELETE_ITEM_MESSAGE } from '../constant/message.js';
import { PRIORITY_TYPE } from '../constant/constants.js';

class TodoListController {
  constructor() {
    this.$todoList = $('.todo-list');
    this.$todoList.addEventListener('click', this.onClickTodoList);
    this.$todoList.addEventListener('dblclick', this.onDoubleClickTodoList);
    this.$todoList.addEventListener('keyup', this.onKeyUpTodoList);
    this.$todoList.addEventListener('change', this.onChangePriority);
  }

  onClickTodoList = ({ target }) => {
    if (
      ElementValidator.isNotDeleteBtn(target) &&
      ElementValidator.isNotToggleBtn(target)
    ) {
      return;
    }
    if (ElementValidator.isDeleteBtn(target)) this.deleteItem(target);
    else if (ElementValidator.isToggleBtn(target)) this.toggleItem(target);
  };

  onDoubleClickTodoList = ({ target }) => {
    if (ElementValidator.isNotLabel(target)) return;
    const $item = target.closest('.todo-item');
    todoListView.activateEditMode($item);
  };

  onKeyUpTodoList = event => {
    if (KeyValidator.isNotEnter(event.key) && KeyValidator.isNotEsc(event.key))
      return;
    const $item = event.target.closest('.todo-item');
    if (KeyValidator.isEnter(event.key)) {
      this.editItem($item);
      todoListView.deactivateEditMode($item);
    } else if (KeyValidator.isEsc(event.key)) {
      todoListView.deactivateEditMode($item);
    }
  };

  onChangePriority = ({ target }) => {
    if (!target.classList.contains('chip')) return;
    this.changePriority(target);
  };

  async loadUserItems(userID) {
    const items = await API.getUserTodoItems(userID);
    todoListView.render(items);
  }

  async deleteItem(target) {
    if (!confirm(DELETE_ITEM_MESSAGE)) return;
    const itemID = target.closest('.todo-item').dataset.id;
    await API.deleteTodoItem(userStore.currentUserID, itemID);
    this.loadUserItems(userStore.currentUserID);
  }

  async toggleItem(target) {
    const $item = target.closest('.todo-item');
    const itemiD = $item.dataset.id;
    // $item.classList.toggle('completed'); // 빠르게 ui변경 하고싶으면 이걸로
    await API.toggleTodoItem(userStore.currentUserID, itemiD);
    this.loadUserItems(userStore.currentUserID);
  }

  async editItem(item) {
    const text = $('.edit', item).value;
    const itemID = item.dataset.id;
    await API.updateTodoItem(userStore.currentUserID, itemID, text);
    // todoListView.editItem(item, text);// 빠르게 ui변경 하고 싶으면 이걸로
    this.loadUserItems(userStore.currentUserID);
  }

  async changePriority(target) {
    const itemID = target.closest('.todo-item').dataset.id;
    const priority = PRIORITY_TYPE[target.value];
    await API.changePriority(userStore.currentUserID, itemID, priority);
    this.loadUserItems(userStore.currentUserID);
  }
}

export const todoListController = new TodoListController();
