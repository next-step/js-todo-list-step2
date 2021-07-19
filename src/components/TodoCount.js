import Component from '../core/Component.js'
import Filter from '../constants/TodoFilter.js'
import { getFilter, getSelectedTodoCount } from '../utils/todoUtil.js'
import Event from '../constants/Event.js'
import { store } from '../modules/index.js'
import { changeFilter, deleteTodos } from '../modules/todo/creator.js'
import { getActiveUserId } from '../utils/userUtil.js'
import TodoConnector from '../utils/TodoConnector.js'

const actions = Object.freeze({
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
  DELETE_ALL: 'deleteAll',
})

export default class TodoCount extends Component {
  setEvent(target) {
    this.addClickEvents(target)
  }

  addClickEvents(target) {
    target.addEventListener(Event.CLICK, (event) => {
      const action = event.target.dataset.action

      if (!action) {
        return
      }

      const filter = getFilter()
      switch (action) {
        case actions.ALL:
          if (filter !== Filter.ALL) {
            store.dispatch(changeFilter(Filter.ALL))
          }
          break

        case actions.ACTIVE:
          if (filter !== Filter.ACTIVE) {
            store.dispatch(changeFilter(Filter.ACTIVE))
          }
          break

        case actions.COMPLETED:
          if (filter !== Filter.COMPLETED) {
            store.dispatch(changeFilter(Filter.COMPLETE))
          }
          break

        case actions.DELETE_ALL:
          const userId = getActiveUserId()
          store.dispatch(deleteTodos())
          TodoConnector.deleteAllTodoItems(userId)
          break
      }

      event.stopImmediatePropagation()
    })
  }

  template() {
    const count = getSelectedTodoCount()
    const filter = getFilter()

    return `
      <span class="todo-count">총 <strong>${count}</strong> 개</span>
      <ul class="filters">
        <li>
          <a href="#" class="all ${filter === Filter.ALL ? 'selected' : ''}"
            data-action=${actions.ALL}>전체보기</a>
        </li>
        <li>
          <a href="#active" class="active ${
            filter === Filter.ACTIVE ? 'selected' : ''
          }" data-action=${actions.ACTIVE}>해야할 일</a>
        </li>
        <li>
          <a href="#completed" class="completed ${
            filter === Filter.COMPLETE ? 'selected' : ''
          }" data-action=${actions.COMPLETED}>완료한 일</a>
        </li>
      </ul>
      <button class="clear-completed"  
        data-action=${actions.DELETE_ALL}>모두 삭제</button>
    `
  }
}
