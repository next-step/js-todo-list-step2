import {Component} from "../../core/Component.js";
import {PUT_ITEM, PUT_PRIORITY_ITEM, REMOVE_ITEM, SET_EDITING, todoStore, TOGGLE_ITEM} from "../../store/todoStore.js";
import {userStore} from "../../store/userStore.js";
import LoadingTypes from "../../constants/LoadingTypes.js";

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

const getItemClass = (completed, editing) => editing   ? ' class="editing"'   :
                                             completed ? ' class="completed"' : '';

export const TodoList = class extends Component {

  get #user () {
    return userStore.$getters.selectedUserName;
  }

  #removeItem (index) {
    const { todoItems } = todoStore.$state;
    todoStore.dispatch(REMOVE_ITEM, {
      user: this.#user,
      id: todoItems[index]._id,
    });
  }

  #toggleItem (index) {
    const { todoItems } = todoStore.$state;
    todoStore.dispatch(TOGGLE_ITEM, {
      user: this.#user,
      id: todoItems[index]._id,
    });
  }

  #updateItem (contents) {
    const { editingItem } = todoStore.$getters;
    editingItem.contents = contents;
    todoStore.dispatch(PUT_ITEM, {
      user: this.#user,
      item: editingItem
    })
  }

  #selectPriority (index, priority) {
    const { todoItems } = todoStore.$state;
    todoItems[index].priority = Number(priority);
    todoStore.dispatch(PUT_PRIORITY_ITEM, {
      user: this.#user,
      item: todoItems[index]
    })
  }

  render () {
    const { loading, editingIndex } = todoStore.$state;
    const items = todoStore.$getters.filteredItems;
    if (loading === LoadingTypes.INIT) {
      return loadingArray.map(() => progressTemplate).join('')
    }
    return items.map(([ index, { _id, contents, isCompleted, priority, isLoading = false } ]) =>
      isLoading ? progressTemplate : `
      <li ${getItemClass(isCompleted, editingIndex === index)} data-index="${index}">
        <div class="view">
          <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''} />
          <label class="label">
            ${ priority === 1 ? `<span class="chip primary">1순위</span>` :
               priority === 2 ? `<span class="chip secondary">2순위</span>` : `
              <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>`}
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
      if (target.classList.contains('toggle'))
        this.#toggleItem(getIndex(target));
      if (target.classList.contains('chip'))
        this.#selectPriority(getIndex(target), target.value);
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
}