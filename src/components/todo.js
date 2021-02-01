import {$todoList} from '../todoDOM.js';
import {template} from '../template.js';
import {api} from '../api.js';

export const todo = {
    load : async (userId) => {
        const array = await api.loadTodoList(userId);
        console.log(array);

        let todos = [];
        for(let i in array){
            const newTodo = array[i].contents;
            todos = [...todos, newTodo];
        }

        todo.clear();
        todos.forEach(item => {todo.input(item)});
    },

    addItem ({target, key}) {
        if(target.value && key === 'Enter'){
            todo.input(target.value);
            target.value = '';
        }
    },

    input (contents) {
        $todoList.insertAdjacentHTML('beforeend', template.todo(contents));
    },

    clear () {
        while($todoList.firstChild){
            $todoList.lastChild.remove();
        }
    }

}