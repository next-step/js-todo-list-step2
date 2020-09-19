import { postUserItemService } from '../../endpoint/service.js';
import { getter, setter } from '../../store/index.js';

const TodoInput = () => {
  const dom = document.createElement('section');
  dom.classList.add('input-container');

  const addUserItem = async ({ target, key }) => {
    let { value } = target;
    if (value !== '' && key === 'Enter') {
      const userId = getter.userId();
      const result = await postUserItemService({ userId, contents: value });
      if (result.message) {
        alert(result.message);
        await setter.userList();
        await setter.user();
        target.value = '';
        return;
      }
      await setter.userItems(userId);
      target.value = '';

    }
  };

  dom.addEventListener('keydown', addUserItem);

  const render = () => {
    dom.innerHTML = `
        <input
        class="new-todo"
        placeholder="할 일을 입력해주세요."
        autofocus />`;
  };

  return { dom, render };
};

export default TodoInput;