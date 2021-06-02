import Component from '../core/Component.js'
import Priority from '../constants/Priority.js'
import TodoItemStatus from '../constants/TodoItemStatus.js'
import { getSelectedTodos, validationTodo } from '../utils/todoUtil.js'
import Event from '../constants/Event.js'
import TodoConnector from '../utils/TodoConnector.js'
import Keyboard from '../constants/Keyboard.js'
import { getActiveUserId } from '../utils/userUtil.js'
import { store } from '../modules/index.js'

import {
  deleteTodo,
  editingTodo,
  priorityTodo,
  toggleTodo,
  updateTodo,
} from '../modules/todo/creator.js'

const actions = Object.freeze({
  TOGGLE_TODO: 'toggleTodo',
  TOGGLE_EDITING_TODO: 'toggleEditingTodo',
  DELETE_TODO: 'deleteTodo',
  UPDATE_TODO: 'updateTodo',
})

const getLabelColor = (priority) => {
  if (priority === Priority.FIRST) {
    return 'primary'
  }

  if (priority === Priority.SECOND) {
    return 'secondary'
  }

  return
}

const getLabelContents = (priority) => {
  if (priority === Priority.FIRST) {
    return '1'
  }

  if (priority === Priority.SECOND) {
    return '2'
  }

  return
}

const TodoItem = ({
  _id,
  priority,
  contents,
  isCompleted,
  editing = false,
}) => {
  return `
    <li data-id=${_id}
    class="${editing ? TodoItemStatus.EDITING : ''}
    ${isCompleted ? TodoItemStatus.COMPLETED : ''}">
      <div class="view">
        <input class="toggle" type="checkbox" 
          ${isCompleted ? 'checked' : ''} data-action=${actions.TOGGLE_TODO} />
          <label class="label" data-action=${actions.TOGGLE_EDITING_TODO}>
          ${
            priority === Priority.NONE
              ? `<select class="chip select">
                  <option value=${Priority.NONE} selected>순위</option>
                  <option value=${Priority.FIRST}>1순위</option>
                  <option value=${Priority.SECOND}>2순위</option>
                </select>`
              : `<span class="chip ${getLabelColor(
                  priority
                )}">${getLabelContents(priority)}순위</span>`
          }
          ${contents}
        </label>
        <button class="destroy" data-action=${actions.DELETE_TODO}></button>
      </div>
      <input class="edit" value=${contents} 
      data-action=${actions.UPDATE_TODO} data-value=${contents} />
    </li>
  `
}

export default class TodoList extends Component {
  setEvent(target) {
    this.setPriorityTodoItem(target)
    this.todoListClickEvent(target)
    this.editTodoItem(target)
  }

  async todoListClickEvent(target) {
    target.addEventListener(Event.CLICK, (event) => {
      const { TOGGLE_TODO, DELETE_TODO } = actions
      switch (event.target.dataset.action) {
        case TOGGLE_TODO:
          this.toggleTodo(event.target)
          break

        case DELETE_TODO:
          this.deleteTodo(event.target)
          break
      }

      event.stopImmediatePropagation()
    })
  }

  async editTodoItem(target) {
    target.addEventListener(Event.DOUBLE_CLICK, (event) => {
      if (event.target.dataset.action !== actions.TOGGLE_EDITING_TODO) {
        return
      }

      const closest = event.target.closest('li')
      const editing = this.isEditing(closest)
      const itemId = this.getItemIdByClosest(event.target)

      if (!editing) {
        store.dispatch(editingTodo(itemId, !editing))
      }

      event.stopImmediatePropagation()
    })

    target.addEventListener(Event.KEY_DOWN, (event) => {
      const itemId = this.getItemIdByClosest(event.target)
      const editing = false

      if (event.target.dataset.action === actions.UPDATE_TODO) {
        const input = event.target
        if (event.key === Keyboard.ENTER) {
          if (!validationTodo(input.value)) {
            return
          }

          const userId = getActiveUserId()
          const contents = input.value
          store.dispatch(updateTodo(itemId, contents))
          store.dispatch(editingTodo(itemId, editing))
          TodoConnector.updateTodoItem(userId, itemId, contents)
        }

        if (event.key === Keyboard.ESCASE) {
          const prevValue = input.dataset.value
          input.value = prevValue
          store.dispatch(editingTodo(itemId, editing))
        }
      }

      event.stopImmediatePropagation()
    })
  }

  async setPriorityTodoItem(target) {
    target.addEventListener(Event.CHANGE, (event) => {
      const priority = event.target.value

      if (priority !== Priority.SECOND && priority !== Priority.FIRST) {
        return
      }

      const userId = getActiveUserId()
      const itemId = this.getItemIdByClosest(event.target)
      TodoConnector.updatePriority(userId, itemId, priority)
      store.dispatch(priorityTodo(itemId, priority))

      event.stopImmediatePropagation()
    })
  }

  async toggleTodo(target) {
    const userId = getActiveUserId()
    const itemId = this.getItemIdByClosest(target)
    const { isCompleted } = await TodoConnector.toggleTodoItem(userId, itemId)
    store.dispatch(toggleTodo(itemId, isCompleted))
  }

  async deleteTodo(target) {
    const userId = getActiveUserId()
    const itemId = this.getItemIdByClosest(target)
    store.dispatch(deleteTodo(itemId))
    TodoConnector.deleteTodoItem(userId, itemId)
  }

  getItemIdByClosest(target) {
    return target.closest('li').dataset.id
  }

  isEditing(element) {
    if (!element) {
      return
    }
    return element.classList.contains(TodoItemStatus.EDITING)
  }

  template() {
    const todoList = getSelectedTodos()

    return `
        <ul class="todo-list">
        ${todoList && todoList.map((todo) => TodoItem(todo)).join('')}
      </ul>
    `
  }
}
