import {getCurrentUser} from '../../utils/localStorage.js';
import {loadTodos} from './loadTodos.js';
const $filters = document.querySelector('.filters');

const selectOption = (option) => {
    const buttons = $filters.querySelectorAll('a');
    buttons.forEach((button) => button.classList.remove('selected'));
    $filters.querySelector(`.${option}`).classList.add('selected');
};

export const filterTodo = () => {
    $filters.addEventListener('click', onFilterTodo);
}

const onFilterTodo = ({target}) => {
    if(target.classList.contains('all')) show('all');
    else if(target.classList.contains('active')) show('active');
    else if(target.classList.contains('completed')) show('completed');
};


const show = (option) => {
    const user = getCurrentUser();

    selectOption(option);
    loadTodos(user, option);
};
