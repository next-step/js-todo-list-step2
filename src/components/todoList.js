import {loadUser} from './user.js';
import {todo} from './todo.js';

export const getSelectedUserTodo = ({target}) => {
    const userId = loadUser.getId(target);
    
    todo.load(userId);
}