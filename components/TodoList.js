import { PRIORITY_TYPE } from '../consts/priorityType.js'

export default function TodoList($el, { todoItems, isLoading }) {
  this.$el = $el
  this.state = {
    todoItems,
    isLoading,
  }

  const makeTodoItemTemplate = function (todoItem) {
    const { _id, contents, priority, isCompleted } = todoItem
    return `
        <li class="${
          isCompleted ? 'completed' : ''
        }" data-todo-item-id="${_id}">
            <div class="view">
                <input class="toggle" type="checkbox" />
                <label class="label">
                    ${makePriorityTemplate(priority)}
                    ${contents}
                </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${contents}" />
        </li>
    `
  }

  const makePriorityTemplate = function (priority) {
    if (priority === 'NONE') {
      return `
            <select class="chip select">
                <option value="0" selected>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
            </select> 
          `
    }
    return `
        <span class="chip ${PRIORITY_TYPE[priority].className}">
            ${PRIORITY_TYPE[priority].text}
        </span>
      `
  }

  this.setState = ({ todoItems, isLoading }) => {
    this.state = {
      ...this.state,
      todoItems,
      isLoading,
    }

    this.render()
  }

  this.render = function () {
    const { todoItems, isLoading } = this.state

    this.$el.innerHTML = `
        <section class="main">
          <ul class="todo-list">
            ${
              isLoading
                ? `
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
                `
                : todoItems.map(makeTodoItemTemplate).join('')
            }
            </ul>
        </section>
        `
  }

  this.initialize = function () {
    this.render()
  }

  this.initialize()
}
