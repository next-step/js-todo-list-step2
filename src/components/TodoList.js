import { Component } from "../core/Component.js";
import { REMOVE_ITEM, todoStore } from "../store/todoStore.js";
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

export const TodoList = class extends Component {

  get user () {
    return userStore.$getters.selectedUser.name;
  }

  render () {
    const { loading, todoItems } = todoStore.$state;
    if (loading === LoadingTypes.INIT) {
      return loadingArray.map(() => progressTemplate).join('')
    }
    return todoItems.map(({ _id, contents, isCompleted, isLoading = false }, index) =>
      isLoading ? progressTemplate : `
      <li data-index="${index}">
        <div class="view">
          <input class="toggle" ${isCompleted ? 'checked' : ''} />
          <label class="label">
            <select class="chip select">
              <option value="0" selected>순위</option>
              <option value="1">1순위</option>
              <option value="2">2순위</option>
            </select>
            <span class="chip primary">1순위</span>
            <span class="chip secondary">2순위</span>
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
      const { todoItems } = todoStore.$state;
      const index = Number(target.closest('[data-index]').dataset.index);
      todoStore.dispatch(REMOVE_ITEM, {
        user: this.user,
        id: todoItems[index]._id,
      });
    })
  }
}