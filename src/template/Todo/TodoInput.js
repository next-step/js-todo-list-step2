import { createUserTodoItem } from '../../endpoint/service.js';
import { getter, setter, initStore, observer } from '../../store/index.js';
import { ERROR } from '../../constants/messageAPI.js';

const TodoInput = () => {
  const dom = document.createElement('section');
  dom.classList.add('input-container');

  const addUserItem = async ({ target, key }) => {
    let { value } = target;
    if (value !== '' && key === 'Enter') {
      const userId = getter.userId();
      try {
        await createUserTodoItem({ userId, contents: value });
        await setter.userItems(userId);
      } catch (err) {
        if (err.message = ERROR.NO_USER) {
          // something
        }
        alert(err.message);
        await initStore();
      } finally {
        target.value = '';
      }
    }
  };

  dom.addEventListener('keypress', addUserItem);

  const render = () => {
    const isUserId = !!getter.userId();
    dom.innerHTML = `
        <input
        class="new-todo"
        placeholder="${isUserId ? '할 일을 입력해주세요.' : '선택된 유저가 없습니다'}"
        autofocus ${isUserId || 'disabled'}/>`;
  };
  observer.addObserver('user', render);

  render();
  return dom;
};

export default TodoInput;