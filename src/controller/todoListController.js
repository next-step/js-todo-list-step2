'use strict';

import { $ } from '../utils/dom.js';
import { todoListView } from '../view/todoListView.js';
import { todoListStore } from '../store/store.js';
import { ElementValidator } from '../validator/validator.js';
import { DELETE_ITEM_MESSAGE } from '../constant/message.js';

class TodoListController {
  constructor() {
    this.$todoList = $('.todo-list');
    this.$todoList.addEventListener('click', this.onClickTodoList);
    this.$todoList.addEventListener('dblclick', this.onDoubleClickTodoList);
    this.$todoList.addEventListener('keyup', this.onKeyIpTodoList);
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
    console.log('onClickTodoList');
  };

  onDoubleClickTodoList = () => {
    console.log('onDoubleClickTodoList');
  };

  onKeyIpTodoList = () => {
    console.log('onKeyIpTodoList');
  };

  deleteItem(target) {
    if (!confirm(DELETE_ITEM_MESSAGE)) return;
    const id = target.closest('.todo-item').dataset.id;
    todoListStore.delete(id);
    todoListView.render(todoListStore.todoItems);
  }

  toggleItem(target) {
    const $targetItem = target.closest('.todo-item');
    const id = $targetItem.dataset.id;
    $targetItem.classList.toggle('completed');
    todoListStore.toggle(id);
  }

  init() {
    todoListStore.init();
    todoListView.render(todoListStore.todoItems);
  }
}
export default TodoListController;
