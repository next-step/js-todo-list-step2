import { API } from '../../api/api.js';
import { getCurrentUser } from '../../utils/localStorage.js';
import { loadTodos } from './loadTodos.js';

const getPriorityContent = (value) => {
  const priorityList = {
    1: 'FIRST',
    2: 'SECOND',
    0: 'NONE',
  };
  return priorityList[value];
};

export const changePriority = async ({ target }) => {
  const currentUser = getCurrentUser();
  const currentTarget = target.closest('li').id;
  const priorityContent = getPriorityContent(target.value);

  await API.changePriority(priorityContent, currentUser, currentTarget);
  loadTodos(currentUser);
};
