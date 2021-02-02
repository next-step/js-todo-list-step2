import {
    getUserIdAndDeleteTodolist,
    getUserIdAndItemComplete,
    getUserIdAndModifyTodolist,
    getUserIdAndAddTodolist
} from './Server.js';

function addTodolistItem(value, item) {
    checkServerItemComplete(value,item);
    clickEraseButton();
    clickCheckboxButton();
    clickLabel();
    //strong태그 안에 있는 count 값 적용시키기
    document.querySelector('.todo-count > strong').innerText = document.querySelector('.todo-list').childElementCount;

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

function checkServerItemComplete(value,item){
    const $todo_list = document.querySelector('.todo-list');
    if(item==='F') {
        const content = (value) => `
        <li class="active"> 
            <div class="view">
                <input class="toggle" type="checkbox">
                <label class="label">${value}</label>            
                <button class="destroy"></button>    
            </div>
        </li>
    `
        $todo_list.innerHTML += content(value);
    }
    else{
        const content = (value) => `
        <li class="completed"> 
            <div class="view">
                <input class="toggle" type="checkbox" checked="true">
                <label class="label">${value}</label>            
                <button class="destroy"></button>    
            </div>
        </li>
    `
        $todo_list.innerHTML += content(value);
    }
}

function clickEraseButton(){
    //버튼 클릭시 가장가까운 li태그 삭제 및, 해야할 count 값 줄이기
    document.querySelectorAll('.destroy').forEach($el => $el.addEventListener('click', function (event) {
        event.target.closest('li').remove();
        document.querySelector('.todo-count > strong').innerText =  document.querySelector('.todo-list').childElementCount;;
        getUserIdAndDeleteTodolist(document.querySelector('#user-list > .active').innerHTML, $el.parentNode.children[1].innerText);
    }))
}

function clickCheckboxButton(){
    // 체크박스 클릭시 li태그에 class속성 추가 및 text에 중간작대기 생성 (클릭 취소하면 class속성 completed 추가 및 text원래대로)
    // 체크박스 클릭 혹은 클릭 취소 시  localStorage 속성도 변화시킨다.
    document.querySelectorAll('.toggle').forEach($el => $el.addEventListener('click', function ({target}) {
        let $liTarget = target.closest('li'), $divTarget = target.closest('div');
        if ($el.checked === true) {
            $liTarget.setAttribute('class','completed');
            getUserIdAndItemComplete(document.querySelector('#user-list > .active').innerHTML, $el.parentNode.children[1].innerText)
        } else {
            $liTarget.setAttribute('class','active');
            //Completed를 True를 False로 하는 방법을 몰라서 해당 할일을 삭제하고 다시만들어 "isCompleted":False 상태로 만든다.
            getUserIdAndDeleteTodolist(document.querySelector('#user-list > .active').innerHTML, $el.parentNode.children[1].innerText);
            getUserIdAndAddTodolist(document.querySelector('#user-list > .active').innerHTML, $el.parentNode.children[1].innerText);
        }
    }))
}

function clickLabel(){
    //label 더블클릭시 작동
    document.querySelectorAll('.label').forEach($el => $el.addEventListener('dblclick',function(event){
        // 기존의 class인 li_class와 input태그인 input_tag 설정
        let liClass = event.target.closest('li').getAttribute('class');
        let inputTag  = document.createElement('input');

        event.target.closest('li').setAttribute('class','editing');
        inputTag.setAttribute('class','edit');
        event.target.closest('li').insertAdjacentElement("beforeend", inputTag);

        //input에서 Enter 클릭시 적용/ Esc 클릭시 취 소적용
        inputTag.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && /[\S]/gi.test(inputTag.value)==true && check_overlap(inputTag.value) == true) {
                //기존 localItem 제거, 새로운 localItem 추가 및 값 변경과 기본값으로 속성 변경 및 click_set 다시 설정(변화 후 바로 적용되게)
                getUserIdAndModifyTodolist(document.querySelector('#user-list > .active').innerHTML, event.target.closest('div').children[1].innerText,inputTag.value)

                event.target.closest('label').innerText = inputTag.value;
                inputTag.remove();
                event.target.closest('li').setAttribute('class', 'active');
                event.target.closest('div').children[0].removeAttribute('checked')
                clickSet();

            }
            else if (e.key === 'Escape') {
                // li class가 editing에서 active로 다시 원래로 바꾸기 및 inputTag 제거
                inputTag.remove();
                event.target.closest('li').setAttribute('class', liClass);     //기존의 class로 바꾸기
            }
            else if(e.key === 'Enter' && /[\S]/gi.test(inputTag.value)==false){
                alert('공백 입력 금지')
            }
            else if(e.key === 'Enter' && checkOverlap(inputTag.value) == false){
                alert('이미 존재하는 할일 입력 금지')
            }
        });
    }))
}

//기존 할일과 같은 이름의 중복 방지 함수
function checkOverlap(value){
    for(let i=0;i<localStorage.length;i++)
    {
        if(value === localStorage.key(i))
            return false;
    }
    return true;
}

export {addTodolistItem,clickSet,checkOverlap};
