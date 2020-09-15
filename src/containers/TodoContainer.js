import {Component} from "../core/Component.js";
import {TodoAppender} from "../components/Todo/TodoAppender.js";
import {TodoList} from "../components/Todo/TodoList.js";
import {TodoFooter} from "../components/Todo/TodoFooter.js";
import {userStore} from "../store/userStore.js";
import {
  ADD_ITEM,
  PUT_ITEM,
  PUT_PRIORITY_ITEM, REMOVE_ALL_ITEM,
  REMOVE_ITEM, SET_EDITING,
  SET_FILTER_TYPE,
  todoStore,
  TOGGLE_ITEM
} from "../store/todoStore.js";

export const TodoContainer = class extends Component {

  get user () { return userStore.$getters.selectedUser?._id; }

  appendItem (contents) {
    todoStore.dispatch(ADD_ITEM, { userId: this.user, contents });
  }

  removeItem (index) {
    const { todoItems } = todoStore.$state;
    todoStore.dispatch(REMOVE_ITEM, {
      userId: this.user,
      itemId: todoItems[index]._id,
    });
  }

  toggleItem (index) {
    const { todoItems } = todoStore.$state;
    todoStore.dispatch(TOGGLE_ITEM, {
      userId: this.user,
      itemId: todoItems[index]._id,
    });
  }

  updateItem (contents) {
    const { editingItem } = todoStore.$getters;
    editingItem.contents = contents;
    todoStore.dispatch(PUT_ITEM, {
      userId: this.user,
      item: editingItem
    })
  }

  selectPriority (index, priority) {
    const item = todoStore.$state.todoItems[index];
    item.priority = priority;
    todoStore.dispatch(PUT_PRIORITY_ITEM, { userId: this.user, item });
  }

  editingItem (index) {
    todoStore.commit(SET_EDITING, index);
  }

  filterItem (filterType) {
    todoStore.commit(SET_FILTER_TYPE, filterType);
  }

  removeAll () {
    todoStore.dispatch(REMOVE_ALL_ITEM, this.user);
  }

  componentInit () {

    this.$children = {
      TodoAppender: {
        constructor: TodoAppender,
        props: {
          appendItem: this.appendItem.bind(this)
        }
      },
      TodoList: {
        constructor: TodoList,
        props: {
          removeItem: this.removeItem.bind(this),
          toggleItem: this.toggleItem.bind(this),
          updateItem: this.updateItem.bind(this),
          selectPriority: this.selectPriority.bind(this),
          editingItem: this.editingItem.bind(this),
          get loading () { return todoStore.$state.loading },
          get editingIndex () { return todoStore.$state.editingIndex },
          get items () { return todoStore.$getters.filteredItems }
        }
      },
      TodoFooter: {
        constructor: TodoFooter,
        props: {
          filterItem: this.filterItem.bind(this),
          removeAll: this.removeAll.bind(this),
          get itemCount () { return todoStore.$getters.filteredItems.length },
          get filterType () { return todoStore.$state.filterType },
        }
      },
    }
  }

  template () {
    return `
      <section class="todoapp">
        <section data-component="TodoAppender" class="input-container"></section>
        <section class="main">
          <ul data-component="TodoList" class="todo-list"></ul>
        </section>
        <div data-component="TodoFooter" class="count-container"></div>
      </section>
    `;
  }
}