import {getCurrentUser} from '../../utils/localStorage.js';
import {loadTodos} from './loadTodos.js';

export const filterTodo = () => {
    const $filters = document.querySelector('.filters');
    $filters.addEventListener('click', onFilterTodo);
}
const selectOption = (option) => {
    const buttons = document.querySelectorAll('.filters a');
    
    buttons.forEach((button) => button.classList.remove('selected'));
    document.getElementById(`${option}`).classList.add('selected');
};

const onFilterTodo = ({target}) => {
    const filters = ['all','active','completed'];
    if(filters.includes(target.id)) show(target.id);
};

const show = (option) => {
    const user = getCurrentUser();

    selectOption(option);
    loadTodos(user, option);
};
