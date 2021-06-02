import Component from '../core/Component.js'
import EVENT from '../constants/Event.js'
import KEY from '../constants/Keyboard.js'
import { store } from '../modules/index.js'
import TodoConnector from '../utils/TodoConnector.js'
import { validationTodo } from '../utils/todoUtil.js'
import { addTodo } from '../modules/todo/creator.js'
import { getActiveUserId } from '../utils/userUtil.js'

export default class TodoInput extends Component {
  async addTodo(contents) {
    const userId = getActiveUserId()

    if (!userId) {
      return
    }

    const todoItem = await TodoConnector.addTodoItem(userId, contents)
    store.dispatch(addTodo(todoItem))
  }

  setEvent(target) {
    target.addEventListener(EVENT.KEY_DOWN, (event) => {
      if (event.key !== KEY.ENTER) {
        return
      }
      const value = event.target.value

      if (!validationTodo(value)) {
        return
      }

      this.addTodo(value)
      event.target.value = ''

      event.stopImmediatePropagation()
    })
  }
}
