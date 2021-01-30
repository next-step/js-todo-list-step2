import { getCurrentUser } from '../../utils/localStorage.js';
import { loadTodos } from './loadTodos.js';

const selectTarget = (target) => {
  target
    .closest('ul')
    .querySelectorAll('a')
    .forEach((target) => target.classList.remove('selected'));
  target.classList.add('selected');
};

const getCurrentOption = (classList) => {
  if (classList.contains('all')) {
    return 'all';
  } else if (classList.contains('active')) {
    return 'active';
  } else {
    return 'completed';
  }
};

export const filterTodo = ({ target }) => {
  if (target.nodeName !== 'A') {
    return;
  }

  const currentUser = getCurrentUser();
  const currentOption = getCurrentOption(target.classList);
  selectTarget(target);

  loadTodos(currentUser, currentOption);
};
