import {$todoList} from '../todoDOM.js';

export const clearTodo = () =>{
    while($todoList.firstChild){
        $todoList.lastChild.remove();
    }
}