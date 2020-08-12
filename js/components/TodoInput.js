import api from '../api.js';
import Input from './Input.js';

export default class TodoInput extends Input {
  constructor({ userName, $element, onEnter }) {
    super({
      $element: $element,
      onEnter: async value => {
        await api.addNewTodoItem(userName, value);
        onEnter();
      }
    });
  }
}
