import {userEdit} from './user.js';
import {todo} from './todo.js';

export const getSelectedUserTodo = ({target}) => {
    const targetValue = target.innerText;
    
    if(targetValue !== '+ 유저 생성'){
        const userId = userEdit.getId(target);
    
        todo.load(userId);
    }
}