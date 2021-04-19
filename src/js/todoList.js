import { $ } from "./util.js";

let todoList;
let totalCount = 0;

const addEventListener = () => {
  $('.todo-list').addEventListener('change', onChangeToggleHandler);
}

const onChangeToggleHandler = (e) => {
  console.log('onChangeToggleHandler')
  if(e.target.className !== 'toggle') return
  console.log(e)
  let li = e.target.closest('li')
  let id = li.getAttribute('id');
  todoList = todoList.map(todo => {
    if(todo._id === id) todo.isCompleted = e.target.checked
    return todo;
  })
  li.classList.toggle('completed')
}

const drawTodoList = (todos) => {
  let tag = '';
  let count = 0;
  todoList = todos;
  console.log(todoList)
  todoList.forEach(todo => {
    count++;
    tag += `<li id="${todo._id}" class="${todo.isCompleted? 'completed':''}">
            <div class="view">
              <input class="toggle" type="checkbox" ${todo.isCompleted? 'checked':''}/>
              <label class="label">`
    if(todo.priority === 'NONE'){
        tag += `<select class="chip select">
                  <option value="0" selected>순위</option>
                  <option value="1">1순위</option>
                  <option value="2">2순위</option>
                </select>`
    }else if(todo.priority === 'FIRST'){
      tag += `<span class="chip primary">1순위</span>`
    }else if(todo.priority === 'SECOND'){
      tag += `<span class="chip secondary">2순위</span>`
    }
    tag += `    ${todo.contents}
              </label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="완료된 타이틀" />
          </li>`
    if(todo.priority === 'FIRST')$('span.chip')
  });
  totalCount = count;
  $('.todo-list').innerHTML = tag;
  $('.todo-count').childNodes[1].textContent = totalCount;
  addEventListener();
}


export const todoListComponent = (todoList) => {
  drawTodoList(todoList)
  
}
