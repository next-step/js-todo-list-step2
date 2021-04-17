import {
  SELECTOR,
  NODE_NAME,
  CLASS_NAME,
  KEY_NAME,
  PRIORITY,
} from '../utils/constant.js';
import { $, $all } from '../utils/dom.js';
import { priorityTemplate, todoListTemplate } from '../utils/templates.js';
import api, { defaultErrorMessage } from '../api/index.js';
import Observer from '../libs/Observer.js';

class TodoList extends Observer {
  constructor(store) {
    super();
    this.store = store;
    this.container = $(SELECTOR.TODO_LIST);
    this.userId = this.store.currentUserId;
    this.bindEvent();
    this.render();
  }

  bindEvent() {
    $(SELECTOR.CLEAR_ALL).addEventListener('click', (e) => this.onClearAll(e));
    this.container.addEventListener('click', (e) => this.onClick(e));
    this.container.addEventListener('dblclick', (e) => this.onDoubleClick(e));
    this.container.addEventListener('keydown', (e) => this.onKeyDown(e));
  }

  async onClick({ target }) {
    try {
      const $li = target.closest(NODE_NAME.LIST);
      if (!$li) return;
      const { id: dataId, contents: dataContents } = $li.dataset;
      const targetClassList = target.classList;
      if (targetClassList.contains(CLASS_NAME.TOGGLE)) {
        return await this.toggleComplete($li, dataId, target);
      } else if (targetClassList.contains(CLASS_NAME.DESTROY)) {
        return await this.removeTodo(dataId);
      } else if (targetClassList.contains(CLASS_NAME.PRIORITY_SELECT)) {
        const priority = target.value;
        if (priority === PRIORITY.NONE) return;
        return await this.changePriority($li, dataId, dataContents, priority);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async onDoubleClick({ target }) {
    try {
      if (target.classList.contains(NODE_NAME.LABEL)) {
        return await this.changeToEditMode(target);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async onKeyDown({ key }) {
    try {
      if (key === KEY_NAME.ENTER || key === KEY_NAME.ESC) {
        const $editList = $all(SELECTOR.EDIT_INPUT, this.container);
        const $activeInput = Array.from($editList).find(
          (element) => element === document.activeElement,
        );
        $activeInput && (await this.closeEditMode($activeInput, key));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async onClearAll() {
    try {
      const result = await api.removeAllTodos(this.userId);
      if (result.isError) {
        return alert(result.errorMessage);
      }
      this.store.setOriginList([]);
      this.store.setRenderList([]);
    } catch (error) {
      console.error(error);
    }
  }

  changeToEditMode(target) {
    const $li = target.closest(NODE_NAME.LIST);
    if ($li.classList.contains(CLASS_NAME.COMPLETED)) return;
    const value = $li.dataset.contents;
    const $input = $(SELECTOR.EDIT_INPUT, $li);
    $li.classList.add(CLASS_NAME.EDITING);
    $input.value = value;
  }

  async closeEditMode(target, key) {
    try {
      const $li = target.closest(NODE_NAME.LIST);
      const { contents, id, priority } = $li.dataset;
      const $label = $(NODE_NAME.LABEL, $li);
      const value = target.value;
      if (key === KEY_NAME.ENTER && value !== contents && value.length > 0) {
        $li.dataset.contents = value;
        $label.innerHTML = priorityTemplate[priority] + value;
        await this.updateTodo(id, value);
      }
      $li.classList.remove(CLASS_NAME.EDITING);
    } catch (error) {
      console.error(error);
    }
  }

  async updateTodo(itemId, contents) {
    try {
      const updateResult = await api.updateTodo(this.userId, itemId, contents);
      if (updateResult.isError) {
        return alert(updateResult.errorMessage);
      }
      const updatedList = this.store.originTodoList.map((data) => {
        if (data._id === itemId) {
          return { ...data, contents };
        }
        return data;
      });
      this.store.setOriginList(updatedList);
    } catch (error) {
      return alert(defaultErrorMessage);
    }
  }

  async toggleComplete($li, dataId, target) {
    try {
      target.toggleAttribute('checked');
      $li.classList.toggle(CLASS_NAME.COMPLETED);
      const result = await api.toggleTodoComplete(this.userId, dataId);
      if (result.isError) {
        return alert(result.errorMessage);
      }
      const updatedData = this.store.originTodoList.map((data) => {
        if (data._id === dataId) {
          return { ...data, isCompleted: !data.isCompleted };
        }
        return data;
      });
      this.store.setOriginList(updatedData);
    } catch (error) {}
  }

  async removeTodo(dataId) {
    try {
      const result = await api.removeTodo(this.userId, dataId);
      if (result.isError) {
        return alert(result.errorMessage);
      }
      const updatedRenderData = this.store.renderTodoList.filter(
        (todo) => todo._id !== dataId,
      );
      const updatedOriginData = this.store.originTodoList.filter(
        (todo) => todo._id !== dataId,
      );
      this.store.setOriginList(updatedOriginData);
      this.store.setRenderList(updatedRenderData);
    } catch (error) {}
  }

  async changePriority($li, dataId, dataContents, priority) {
    try {
      const result = await api.setTodoPriority(this.userId, dataId, priority);
      if (result.isError) {
        return alert(result.errorMessage);
      }
      const label = $(NODE_NAME.LABEL, $li);
      label.innerHTML = priorityTemplate[priority] + dataContents;
    } catch (error) {
      console.error(error);
    }
  }

  update() {
    this.userId = this.store.currentUserId;
    this.render();
  }

  render() {
    this.container.innerHTML = todoListTemplate(this.store.renderTodoList);
  }
}

export default TodoList;
