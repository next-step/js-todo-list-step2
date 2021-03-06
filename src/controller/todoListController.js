'use strict';

import { $ } from '../utils/dom.js';
import { todoListView } from '../view/todoListView.js';
import { todoListStore } from '../store/store.js';
import { ElementValidator, KeyValidator } from '../validator/validator.js';
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
  };

  onDoubleClickTodoList = ({ target }) => {
    if (ElementValidator.isNotLabel(target)) return;
    const $item = target.closest('.todo-item');
    todoListView.activateEditMode($item);
  };

  onKeyIpTodoList = event => {
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

  deleteItem(target) {
    if (!confirm(DELETE_ITEM_MESSAGE)) return;
    const id = target.closest('.todo-item').dataset.id;
    todoListStore.delete(id);
    todoListView.render(todoListStore.getItemsByFilter());
  }

  deleteAllItems() {}

  toggleItem(target) {
    const $item = target.closest('.todo-item');
    const id = $item.dataset.id;
    $item.classList.toggle('completed');
    todoListStore.toggle(id);
    todoListView.render(todoListStore.getItemsByFilter());
  }

  editItem(item) {
    const text = $('.edit', item).value;
    const id = item.dataset.id;
    todoListStore.update(id, text);
    // todoListView.editItem(item, text);
    todoListView.render(todoListStore.getItemsByFilter()); // 전체를 렌더할지 하나만 업데이트할지 고민중
  }

  init() {
    todoListStore.init();
    todoListView.render(todoListStore.todoItems);
  }
}

export default TodoListController;
