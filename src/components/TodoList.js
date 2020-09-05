import { Component } from "../core/Component.js";
import {REMOVE_ITEM, todoStore, TOGGLE_ITEM} from "../store/todoStore.js";
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
            ${
              !isCompleted ? `
                <select class="chip select">
                  <option value="0" selected>순위</option>
                  <option value="1">1순위</option>
                  <option value="2">2순위</option>
                </select>
                <span class="chip primary">1순위</span>
                <span class="chip secondary">2순위</span>
              ` : ''
            }
            ${contents}
          </label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}" />
      </li>
    `).join('');
  }

  setEvent (componentTarget) {
    componentTarget.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('destroy')) return;
      this.#removeItem(Number(target.closest('[data-index]').dataset.index));
    })
    componentTarget.addEventListener('change', ({ target }) => {
      if (!target.classList.contains('toggle')) return;
      this.#toggleItem(Number(target.closest('[data-index]').dataset.index));
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
}