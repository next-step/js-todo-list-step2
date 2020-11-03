import DOM from '../core/createElement.js';
import { onCreateTodoInputEnterKeypress } from '../actions.js';

const TodoInput = () =>
  DOM.section(
    {
      class: 'input-container',
    },
    DOM.input({
      class: 'new-todo',
      placeholder: '할 일을 입력해주세요.',
      autofocus: true,
      onkeypress: onCreateTodoInputEnterKeypress,
    })
  );

export default TodoInput;
