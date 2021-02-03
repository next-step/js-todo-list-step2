import {userEdit} from './user.js';
import {todo} from './todo.js';

export const getSelectedUserTodo = ({target}) => {

    if(target.matches('.user-create-button')) return;

    const userId = userEdit.getId(target);
    todo.load(userId);
}