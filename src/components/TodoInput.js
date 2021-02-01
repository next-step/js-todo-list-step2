import selectedUserStore, { ADD_TODO } from '../modules/selectedUser.js';

const TodoInput = () => {
  const $todoInput = document.querySelector('input.new-todo');

  const onAddTodo = async (e) => {
    const contents = e.target.value;
    const userId = await selectedUserStore.getState()._id;
    if (e.key === 'Enter' && contents.trim() !== '') {
      await selectedUserStore.dispatch({
        type: ADD_TODO,
        payload: {
          userId,
          contents,
        },
      });
      e.target.value = '';
    }
  };

  $todoInput.addEventListener('keyup', onAddTodo);
};

export default TodoInput;
