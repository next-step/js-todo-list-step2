import { isEnterKey, isNotEmptyString } from '../utils/validator.js'

export default function TodoInput({ $target, onAddTodo }) {
  if (!new.target) {
    throw new Error('TodoInput must be called with new')
  }

  if (!$target) {
    throw new Error('$target must be injected')
  }

  this.$target = $target

  const onKeyPressEventHandler = (e) => {
    if (!isEnterKey(e) || !isNotEmptyString(e.target.value)) {
      return
    }
    onAddTodo(e.target.value)
    e.target.value = ''
  }
  this.$target.addEventListener('keypress', onKeyPressEventHandler)
}
