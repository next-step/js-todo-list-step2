import {Component} from "../../core/Component.js";
import {PUT_ITEM, PUT_PRIORITY_ITEM, REMOVE_ITEM, SET_EDITING, todoStore, TOGGLE_ITEM} from "../../store/todoStore.js";
import {userStore} from "../../store/userStore.js";
import LoadingTypes from "../../constants/LoadingTypes.js";
import PriorityTypes from "../../constants/PriorityTypes.js";

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
    return userStore.$getters.selectedUser?._id;
  }

  #removeItem (index) {
    const { todoItems } = todoStore.$state;
    todoStore.dispatch(REMOVE_ITEM, {
      userId: this.#user,
      itemId: todoItems[index]._id,
    });
  }

  #toggleItem (index) {
    const { todoItems } = todoStore.$state;
    todoStore.dispatch(TOGGLE_ITEM, {
      userId: this.#user,
      itemId: todoItems[index]._id,
    });
  }

  #updateItem (contents) {
    const { editingItem } = todoStore.$getters;
    editingItem.contents = contents;
    todoStore.dispatch(PUT_ITEM, {
      userId: this.#user,
      item: editingItem
    })
  }

  #selectPriority (index, priority) {
    const { todoItems } = todoStore.$state;
    todoItems[index].priority = priority;
    todoStore.dispatch(PUT_PRIORITY_ITEM, {
      userId: this.#user,
      item: todoItems[index]
    })
  }

  componentInit () {
    this.$stores = [ todoStore, userStore ];
  }

  template () {
    const { loading, editingIndex } = todoStore.$state;
    const items = todoStore.$getters.filteredItems;
    if (loading === LoadingTypes.INIT) {
      return loadingArray.map(() => progressTemplate).join('')
    }
    return items.map(([ index, { _id, contents, isCompleted, priority, isLoading = false } ]) =>
      isLoading ? progressTemplate : `
      <li ${getItemClass(isCompleted, editingIndex === Number(index))} data-index="${index}">
        <div class="view">
          <input data-ref="toggle" class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''} />
          <label data-ref="contents" class="label">
            ${ priority === PriorityTypes.FIRST ? `<span class="chip primary">1순위</span>` :
               priority === PriorityTypes.SECOND ? `<span class="chip secondary">2순위</span>` : `
              <select data-ref="priority" class="chip select">
                <option value="${PriorityTypes.NONE}" selected>순위</option>
                <option value="${PriorityTypes.FIRST}">1순위</option>
                <option value="${PriorityTypes.SECOND}">2순위</option>
              </select>`}
            ${contents}
          </label>
          <button data-ref="destroy" class="destroy"></button>
        </div>
        <input data-ref="editor" class="edit" value="${contents}" />
      </li>
    `).join('');
  }

  setEvent () {
    this.addEvent('click', 'destroy', ({  index }) => this.#removeItem(index));
    this.addEvent('change', 'toggle', ({  index }) => this.#toggleItem(index));
    this.addEvent('change', 'priority', ({ target, index }) => {
      this.#selectPriority(index, target.value);
    });
    this.addEvent('dblclick', 'contents', ({ index }) => todoStore.commit(SET_EDITING, index));
    this.addEvent('keydown', 'editor', ({ key }) => {
      if (key !== 'Escape') return;
      todoStore.commit(SET_EDITING, -1);
    });
    this.addEvent('keypress', 'editor', ({ key, target }) => {
      if (key !== 'Enter') return;
      this.#updateItem(target.value);
    });
  }
}