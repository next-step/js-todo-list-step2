// core
import DOM from '../core/createElement.js';
import eventChannel from '../core/eventChannel.js';
const { done } = eventChannel;

// constants
import { ACTIONS } from '../constants/index.js';
const { VIEW } = ACTIONS;

// function component
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

// event handlers
const onCreateTodoInputEnterKeypress = ({ key, target }) => {
  if (key === 'Enter') {
    done(VIEW.ADD_TODO, { contents: target.value });
    target.value = '';
  }
};

export default TodoInput;
