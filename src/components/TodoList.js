import Component from '../core/Component.js'
import Priority from '../constants/Priority.js'
import TODOSTATUS from '../constants/TodoItemStatus.js'
import TodoItemStatus from '../constants/TodoItemStatus.js'

const getLabelColor = (priority) => {
  if (priority === Priority.FIRST) {
    return 'primary'
  }

  if (priority === Priority.SECOND) {
    return 'secondary'
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
    <li data-id="${_id}" 
    class="${editing ? TodoItemStatus.EDITING : ''}
    ${isCompleted ? TodoItemStatus.COMPLETED : ''}">
      <div class="view">
        <input class="toggle" type="checkbox" 
          ${isCompleted ? 'checked' : ''} data-action="toggleTodo" />
          <label class="label" data-action="toggleEditingTodo">
          ${
            priority === Priority.NONE
              ? `<select class="chip select">
                  <option value="0" selected>순위</option>
                  <option value="1">1순위</option>
                  <option value="2">2순위</option>
                </select>`
              : `<span class="chip ${getLabelColor(priority)}">1순위</span>`
          }
          ${contents}
        </label>
        <button class="destroy" data-action="deleteTodo"></button>
      </div>
      <input class="edit" value="완료된 타이틀" />
    </li>
  `
}

export default class TodoList extends Component {
  setEvent(target) {}

  template() {
    const mocks = [
      {
        _id: 'abc1',
        contents: '해아할 아이템',
        priority: 'NONE',
        isCompleted: false,
      },
      {
        _id: 'abc2',
        contents: '해아할 아이템',
        priority: 'FIRST',
        isCompleted: false,
      },
      {
        _id: 'abc3',
        contents: '해아할 아이템',
        priority: 'SECOND',
        isCompleted: false,
      },
      {
        _id: 'abc4',
        contents: '해아할 아이템',
        priority: 'NONE',
        isCompleted: true,
      },
      {
        _id: 'abc5',
        contents: '해아할 아이템',
        priority: 'NONE',
        isCompleted: true,
        editing: true,
      },
    ]
    return `
        <ul class="todo-list">
        ${mocks && mocks.map((mock) => TodoItem(mock)).join('')}
      </ul>
    `
  }
}
