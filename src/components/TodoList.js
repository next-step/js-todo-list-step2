import { Component } from "../core/Component.js";
import {PUT_ITEM, REMOVE_ITEM, SET_EDITING, todoStore, TOGGLE_ITEM} from "../store/todoStore.js";
import LoadingTypes from "../constants/LoadingTypes.js";
import { userStore } from "../store/userStore.js";

const loadingArray = [ ...Array(5).keys() ];
const progressTemplate = `
  <li>
    <div class="view">
      <label class="label">
        <div class="animated-background">
          <div class="skel-mask-container">
            <div class="skel-mask"></div>
          </div>
        </div>
      </label>
    </div>
  </li>
`;

const getItemClass = (completed, editing) =>
  editing ? ' class="editing"' :
    completed ? ' class="completed"' :
      '';

export const TodoList = class extends Component {

  get user () {
    return userStore.$getters.selectedUser.name;
  }

  render () {
    const { loading, todoItems, editingIndex } = todoStore.$state;
    if (loading === LoadingTypes.INIT) {
      return loadingArray.map(() => progressTemplate).join('')
    }
    return todoItems.map(({ _id, contents, isCompleted, isLoading = false }, index) =>
      isLoading ? progressTemplate : `
      <li ${getItemClass(isCompleted, editingIndex === index)} data-index="${index}">
        <div class="view">
          <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''} />
          <label class="label">
            ${ false ? `
                <select class="chip select">
                  <option value="0" selected>순위</option>
                  <option value="1">1순위</option>
                  <option value="2">2순위</option>
                </select>
                <span class="chip primary">1순위</span>
                <span class="chip secondary">2순위</span>
              ` : ''}
            ${contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}" />
      </li>
    `).join('');
  }

  setEvent (componentTarget) {
    const getIndex = target => Number(target.closest('[data-index]').dataset.index);
    componentTarget.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('destroy')) return;
      this.#removeItem(getIndex(target));
    })
    componentTarget.addEventListener('change', ({ target }) => {
      if (!target.classList.contains('toggle')) return;
      this.#toggleItem(getIndex(target));
    })
    componentTarget.addEventListener('dblclick', ({ target }) => {
      if (!target.classList.contains('label')) return;
      todoStore.commit(SET_EDITING, getIndex(target));
    })
    componentTarget.addEventListener('keydown', ({ target, key }) => {
      if (!target.classList.contains('edit') || key !== 'Escape') return;
      todoStore.commit(SET_EDITING, -1);
    })
    componentTarget.addEventListener('keypress', ({ target, key }) => {
      if (!target.classList.contains('edit') || key !== 'Enter') return;
      this.#updateItem(target.value);
    })
  }

  #removeItem (index) {
    const { todoItems } = todoStore.$state;
    todoStore.dispatch(REMOVE_ITEM, {
      user: this.user,
      id: todoItems[index]._id,
    });
  }

  #toggleItem (index) {
    const { todoItems } = todoStore.$state;
    todoStore.dispatch(TOGGLE_ITEM, {
      user: this.user,
      id: todoItems[index]._id,
    });
  }

  #updateItem (contents) {
    const { editingItem } = todoStore.$getters;
    editingItem.contents = contents;
    todoStore.dispatch(PUT_ITEM, {
      user: this.user,
      item: editingItem
    })
  }
}