import {responseApi} from './Server.js';
import {initElement,clickSet} from './InitElement.js';

// todoList step1 내용들
const $new_todo = document.querySelector('.new-todo');


// 기존 저장된 것들이 있으면 이를 불러오는 함수 진행
function reloadLocalStorage(){
    for(let i=0;i<localStorage.length;i++)
    {
        let key = localStorage.key(i);
        let item = localStorage.getItem(key);
        initElement(key,item,'F');
    }
}

$new_todo.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {
        (/[\S]/gi.test($new_todo.value)==true && checkOverlap($new_todo.value) == true) ? initElement($new_todo.value,'F','T') : alert('공백 혹은 같은 이름의 할일을 입력했습니다.');
        //입력한 할일 추가시 할일 공백으로 만들기
        $new_todo.value = '';
    }
});         // 내용을 입력하고 'Enter'를 누르면 comfirm이 나오고 맞다면 admin함수 실행




//기존 할일과 같은 이름의 중복 방지 함수
function checkOverlap(value){
    for(let i=0;i<localStorage.length;i++)
    {
        if(value === localStorage.key(i))
            return false;
    }
    return true;
}

//처음 시작시 이벤트 핸들러 적용
clickSet();
reloadLocalStorage();

//처음 시작시 이벤트 핸들러 적용
responseApi();
