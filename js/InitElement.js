import {
    getUserIdAndDeleteTodolist,
    getUserIdAndItemComplete,
    getUserIdAndModifyTodolist,
    getUserIdAndAddTodolist
} from './Server.js';

let $count = 0 ;     //할 일 갯수 세는 용
function initElement(value, item, cause_of_add) {
    const $todo_list = document.querySelector('.todo-list');
    const content = (value)=>`
        <li class="active"> 
            <div class="view">
                <input class="toggle" type="checkbox">
                <label class="label">${value}</label>            
                <button class="destroy"></button>    
            </div>
        </li>
    `
    $todo_list.innerHTML += content(value);
    //localStorage의 value(item)이 T이면 completed한 상태 및 체크상태 유지(아닐경우 기본 active와 체크상태 X이다)

    if(item === 'T')
    {
        document.querySelectorAll('.label').forEach($el => {
            if($el.innerText === value){
                $el.closest('li').setAttribute('class' , 'completed');
                $el.closest('div').children[0].setAttribute('checked','true');
            }

        })
    }
    //  item이 F이면 active 상태로 처음 작성시 item == 'F' 일때의 localStorage 저장 역할
    else
        localStorage.setItem(value,'F');

    //버튼 클릭시 가장가까운 li태그 삭제 및, 해야할 count 값 줄이기
    document.querySelectorAll('.destroy').forEach($el => $el.addEventListener('click', function (event) {
        event.target.closest('li').remove();
        document.querySelector('.todo-count > strong').innerText = --$count;
        localStorage.removeItem(event.target.closest('div').children[1].innerText);
        getUserIdAndDeleteTodolist(document.querySelector('#user-list > .active').innerHTML, $el.parentNode.children[1].innerText);
    }))

    // 체크박스 클릭시 li태그에 class속성 추가 및 text에 중간작대기 생성 (클릭 취소하면 class속성 completed 추가 및 text원래대로)
    // 체크박스 클릭 혹은 클릭 취소 시  localStorage 속성도 변화시킨다.
    document.querySelectorAll('.toggle').forEach($el => $el.addEventListener('click', function (event) {
        if ($el.checked === true) {
            event.target.closest('li').setAttribute('class','completed');
            localStorage.setItem(event.target.closest('div').children[1].innerText,'T');
            getUserIdAndItemComplete(document.querySelector('#user-list > .active').innerHTML, $el.parentNode.children[1].innerText)
        } else {
            event.target.closest('li').setAttribute('class','active');
            localStorage.setItem(event.target.closest('div').children[1].innerText,'F');
            //Completed를 True를 False로 하는 방법을 몰라서 해당 할일을 삭제하고 다시만들어 "isCompleted":False 상태로 만든다.
            getUserIdAndDeleteTodolist(document.querySelector('#user-list > .active').innerHTML, $el.parentNode.children[1].innerText);
            getUserIdAndAddTodolist(document.querySelector('#user-list > .active').innerHTML, $el.parentNode.children[1].innerText);
        }
    }))

    //label 더블클릭시 작동
    document.querySelectorAll('.label').forEach($el => $el.addEventListener('dblclick',function(event){
        // 기존의 class인 li_class와 input태그인 input_tag 설정
        let li_class = event.target.closest('li').getAttribute('class');
        let input_tag  = document.createElement('input');

        event.target.closest('li').setAttribute('class','editing');
        input_tag.setAttribute('class','edit');
        event.target.closest('li').insertAdjacentElement("beforeend", input_tag);

        //input에서 Enter 클릭시 적용/ Esc 클릭시 취 소적용
        input_tag.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && /[\S]/gi.test(input_tag.value)==true && check_overlap(input_tag.value) == true) {
                //기존 localItem 제거, 새로운 localItem 추가 및 값 변경과 기본값으로 속성 변경 및 click_set 다시 설정(변화 후 바로 적용되게)
                getUserIdAndModifyTodolist(document.querySelector('#user-list > .active').innerHTML, event.target.closest('div').children[1].innerText,input_tag.value)

                localStorage.removeItem(event.target.closest('label').innerText);
                localStorage.setItem(input_tag.value,'F');
                event.target.closest('label').innerText = input_tag.value;
                input_tag.remove();
                event.target.closest('li').setAttribute('class', 'active');
                event.target.closest('div').children[0].removeAttribute('checked')
                clickSet();

            }
            else if (e.key === 'Escape') {
                // li class가 editing에서 active로 다시 원래로 바꾸기 및 input_tag 제거
                input_tag.remove();
                event.target.closest('li').setAttribute('class', li_class);     //기존의 class로 바꾸기
            }
            else if(e.key === 'Enter' && /[\S]/gi.test(input_tag.value)==false){
                alert('공백 입력 금지')
            }
            else if(e.key === 'Enter' && check_overlap(input_tag.value) == false){
                alert('이미 존재하는 할일 입력 금지')
            }
        });
    }))
    //strong태그 안에 있는 count 값 적용시키기
    document.querySelector('.todo-count > strong').innerText = ++$count;
    //해당 이벤트핸들러 및 모든 걸 끝낸 후 li태그를 가진 내용을 ul태그 안에 넣기

    if(cause_of_add === 'T') {
        getUserIdAndAddTodolist(document.querySelector('#user-list > .active').innerHTML, value);
    }
}
function clickSet() {
//전체보기 버튼 클릭시 모든 내용 display
    document.querySelector('.all').addEventListener('click', onAllFilterHandler);

//해야할 일 버튼 클릭시 class가 completed인 것들은 display가 none이 되도록
    document.querySelector('.active').addEventListener('click', onActiveFilterHandler);

//완료한 일 클릭시 class가 active인 것들은 display가 none이 되도록
    document.querySelector('.completed').addEventListener('click', onCompletedFilterHandler);
}

function onAllFilterHandler(){
    document.querySelectorAll('.todo-list > li').forEach(x => x.style.display = '');
    /* 아래코드도 가능
   let child = document.querySelector('.todo-list')
   child.childNodes.forEach(x=> x.style.display = '');
     */
}

function onActiveFilterHandler(){
    document.querySelectorAll('.todo-list > li').forEach(x => x.classList.contains('active') == true ? x.style.display = '' : x.style.display = 'none');
    /* 아래코드도 가능
    let child = document.querySelector('.todo-list')
    child.childNodes.forEach(x=>x.classList.contains('active') == true ? x.style.display='' : x.style.display = 'none');
    */
}

function onCompletedFilterHandler() {
    document.querySelectorAll('.todo-list > li').forEach(x => x.classList.contains('completed') == true ? x.style.display = '' : x.style.display = 'none')
    /* 아래코드도 가능
    let child = document.querySelector('.todo-list')
    child.childNodes.forEach(x=>x.classList.contains('completed') == true ?  x.style.display='' : x.style.display = 'none')
    */
}

export {initElement,$count,clickSet};
