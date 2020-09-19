import { postUserItemService } from '../../endpoint/service.js';
import { getter, setter } from '../../store/index.js';
import { observer } from '../../store/index.js';

const TodoInput = () => {
  const dom = document.createElement('section');
  dom.classList.add('input-container');

  const addUserItem = async ({ target, key }) => {
    let { value } = target;
    if (value !== '' && key === 'Enter') {
      const userId = getter.userId();
      try {
        await postUserItemService({ userId, contents: value });
        await setter.userItems(userId);
      } catch (err) {
        alert(err.message);
        await setter.userList();
        await setter.user();
      } finally {
        target.value = '';
      }
    }
  };

  dom.addEventListener('keydown', addUserItem);

  const render = () => {
    const isUserId = !!getter.userId();
    dom.innerHTML = `
        <input
        class="new-todo"
        placeholder="${ isUserId ? '할 일을 입력해주세요.' : '선택된 유저가 없습니다' }"
        autofocus ${ isUserId || 'disabled' }/>`;
  };
  observer.addObserver('user', render);

  return { dom, render };
};

export default TodoInput;