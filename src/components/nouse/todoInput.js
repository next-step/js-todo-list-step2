//import {$todoList} from '../todoDOM.js';
//import {template} from '../template.js';

export const addTodoItem = ({target, key}) => {
    if(target.value && key === 'Enter'){
        insertTodo(target.value);
        target.value = '';
    }

}

export const insertTodo = (contents) =>{
  $todoList.insertAdjacentHTML('beforeend', template.todo(contents));
}

