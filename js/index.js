import {responseApi,getUserIdAndAddTodolist} from './Server.js';
import {addTodolistItem,clickSet,checkOverlap} from './AddTodolistItem.js';

// todoList step1 내용들
const $new_todo = document.querySelector('.new-todo');
$new_todo.addEventListener("keyup", clickEnter);

function clickEnter(event) {
    if(event.key === 'Enter' && (/[\S]/gi.test($new_todo.value)!==true || checkOverlap($new_todo.value) !== true)){
        alert('공백 혹은 같은 이름의 할일을 입력했습니다.');
    }
    else if (event.key === 'Enter' && /[\S]/gi.test($new_todo.value)==true && checkOverlap($new_todo.value) == true) {{
        addTodolistItem($new_todo.value,'F');
        getUserIdAndAddTodolist(document.querySelector('#user-list > .active').innerHTML,$new_todo.value);
    }
        //입력한 할일 추가시 할일 공백으로 만들기
        $new_todo.value = '';
    }
}


//처음 시작시 이벤트 핸들러 적용
clickSet();
responseApi();
