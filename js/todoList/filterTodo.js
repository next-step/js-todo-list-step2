import { getCurrentUser } from '../localStorage.js';
import { loadTodos } from './loadTodos.js';

const getCurrentOption = (classList) => {
    if(classList.contains('all')) return 'all';
    else if(classList.contains('active')) return 'active';
    else if (classList.contains('completed')) return 'completed';
};

export const selectTarget = (target) => {
    let $aTagList = target.closest('ul').querySelectorAll('a');
    $aTagList = Array.from($aTagList);
    $aTagList.map((aTag) => aTag.classList.remove('selected'));
    target.classList.add('selected');
};

export const filterTodo = ({ target }) => {
    if(target.tagName !== 'A') return;
    const currentUser = getCurrentUser();
    const currentOption = getCurrentOption(target.classList);
    selectTarget(target);

    loadTodos(currentUser, currentOption);
};
