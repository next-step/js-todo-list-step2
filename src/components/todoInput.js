import {$todoList} from "../todoDOM.js";

export const addTodoItem = ({target, key}) => {
    if(target.value && key === 'Enter'){
        insertTodo(target.value);
        target.value = '';
    }

    // todo가 추가될 때마다 count 수 변경
    //todoCount(filterStatus); 
    
}

export const insertTodo = (contents) =>{
  $todoList.insertAdjacentHTML('beforeend', todoTemplate(contents));
}

const todoTemplate = (title) => {
    return `<li class=">
    <div class="view">
      <input class="toggle" type="checkbox"/>
      <label class="label">${title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="${title}" />
  </li>`
}

