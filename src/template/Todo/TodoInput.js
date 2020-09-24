import { getter, observer } from '../../store/index.js';
import { createDOM } from '../../utils.js';
import { addUserTodoItemHandler } from '../../eventHandler.js';

const TodoInput = () => {
  const dom = createDOM(
    'section',
    {
      className: 'input-container',
    },
  );

  dom.addEventListener('keypress', addUserTodoItemHandler);

  const isUserPlaceholder = (isUserId) => (
    isUserId ? '할 일을 입력해주세요.' : '선택된 유저가 없습니다'
  );

  const isUserInputActive = (isUserId) => (
    isUserId || 'disabled'
  );

  const render = () => {
    const isUserId = !!getter.userId();
    dom.innerHTML = `
        <input
        class="new-todo"
        placeholder="${isUserPlaceholder(isUserId)}"
        autofocus ${isUserInputActive(isUserId)}/>`;
  };

  observer.addObserver('user', render);

  render();
  return dom;
};

export default TodoInput;