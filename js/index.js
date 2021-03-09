import {responseApi,getUserIdAndAddTodolist} from './Server.js';
import {addTodolistItem,initFilterEventListeners} from './AddTodolistItem.js';


const $new_todo = document.querySelector('.new-todo');
$new_todo.addEventListener("keyup", clickEnter);

function clickEnter(event) {
    if(event.key === 'Enter' && /[\S]/gi.test($new_todo.value)!==true){
        alert('공백을 입력했습니다.');
    }
    else if (event.key === 'Enter' && /[\S]/gi.test($new_todo.value)==true) {{
        addTodolistItem($new_todo.value,'F');
        getUserIdAndAddTodolist(document.querySelector('#user-list > .active').innerHTML,$new_todo.value);
    }
        //입력한 할일 추가시 할일 공백으로 만들기
        $new_todo.value = '';
    }
}

//처음 시작시 이벤트 핸들러 적용
initFilterEventListeners();
responseApi();
