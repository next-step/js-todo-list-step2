import {updateCountText} from './common.js'
import {loadUser, loadUsers, loadTodoList,
        addUser, deleteUser,
        addTodoElement, deleteTodoElement, deteleAllTodoElement,
        updateTodoElementPriority, updateTodoElementStatus, updateTodoElementText} from './users.js'

export async function initTodos(){
    // 새로운 할 일 입력폼에 이벤트 리스너 등록.
    document.querySelector('input.new-todo').addEventListener('keyup', onAddTodo)
    
    // 모든(또는 완료된?) 할 일 제거 버튼에 이벤트 리스너 등록.
    document.querySelector('button.clear-completed').addEventListener('click', onRemoveAllTodoClick)

    // 사용자 추가 및 제거 이벤트 처리기 등록.
    const allData = await loadUsers()
    allData.map(data => {
        drawUser(data._id, data.name)
    })
    const userList = document.getElementById('user-list')
    userList.addEventListener('click', onClickUser)
    userList.addEventListener('contextmenu', onRightClickUser)
}


async function checkDuplicates(userid, text){
    const todoList = await loadTodoList(userid)
    return todoList.filter(todoElement => todoElement.contents === text).length > 0
}


async function onClickUser({ target }){
    if(target && target.nodeName === 'BUTTON'){
        // 사용자 선택.
        if(target.getAttribute('id')){
            // 선택된 사용자 강조 표시.
            const users = target.closest('div#user-list').children
            for(const user of users) { 
                user.classList.remove('active')
            }
            target.classList.add('active')
            // 선택된 사용자의 할 일 표시.
            const selectedUserID = target.id
            showTodoListLoadingAnimation()
            const todoList = await loadTodoList(selectedUserID)
            clearTodoList()
            todoList.map(todoElement => drawTodo(todoElement))
            // 헤더 텍스트 변경.
            const selectedUsername = target.innerText
            document.querySelector('h1#user-title span strong').innerText = selectedUsername
            updateCountText()
        // 사용자 추가.
        } else {
            const newUsername = prompt("What is your name?", 'DEFAULT_ACCOUNT').padStart(2, '_')
            const newUserInfo = await addUser(newUsername)
            alert(`New user ${newUserInfo.name}#${newUserInfo._id} added!`)
            drawUser(newUserInfo._id, newUserInfo.name)
        }
    }
}


async function onRightClickUser(event){
    // 사용자 제거.
    if(event.target && event.target.nodeName === 'BUTTON' && event.target.getAttribute('id')){
        event.preventDefault()
        if(!confirm(`Delete user ${event.target.innerText}?`)) return
        const userID = event.target.id
        deleteUser(userID)
        // 만약 현재 선택된 사용자를 제거한다면 할 일 목록도 초기화.
        if(userID === getActiveUserID()){
            clearTodoList()
        }
        event.target.remove()
    }
}


function drawUser(userid, username){
    const userList = document.getElementById('user-list')
    const newUserButton = document.createElement('button')
    newUserButton.classList.add('ripple')
    newUserButton.id = userid
    newUserButton.innerText = username
    userList.insertBefore(newUserButton, userList.querySelector('button[class*="user-create-button"]'))
}


// 사용자 입력으로 새로운 할 일이 추가되는 함수
async function onAddTodo(event){
    // 기본적인 예외 처리(공백 문자열, 중복 할 일 등)
    const newTodoInput = event.target
    const newTodoText = newTodoInput.value.trimStart().trimEnd()
    if(event.key != 'Enter' || newTodoText.length === 0){
        newTodoInput.focus()
        return;
    }

    const userID = getActiveUserID()
    if(userID === null) {
        alert('Select user first!')
        return
    }

    if(await checkDuplicates(userID, newTodoText)){
        alert('That ToDo already exists!')
        return
    }

    newTodoInput.value = ''
    const addedTodo = await addTodoElement(userID, newTodoText)
    drawTodo(addedTodo)
    // 현재 보고 있는 할 일들이 완료된 할 일일 경우를 고려, 할 일 추가 후 필터를 다시 적용.
    applySelectedFilter()
}


// 할 일 추가 시 실제로 HTML 요소를 그리는 함수
function drawTodo({ _id, contents, priority, isCompleted }){
    if(!_id === undefined || !contents === undefined || !priority === undefined || isCompleted === undefined){
        return
    }
    const todoList = document.querySelector('ul.todo-list') 
    const li = document.createElement('li')
    const newTodoHTMLElement = `
        <div class="view">
            <input class="toggle" type="checkbox">
            <label class="label">
                <select class="chip select ${priority == 'FIRST' ? 'primary' : priority == 'SECOND' ? 'secondary' : ''}">
                    <option value="0">순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                </select>
                <span class="text">
                ${contents}
                </span>
            </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="${contents}"></input>
    `
    // 추후 접근 편의를 위해 <li> 태그의 id를 해당 할 일의 고유값으로 설정.
    li.id = _id
    li.innerHTML = newTodoHTMLElement
    // 해당 할 일의 순위값 설정, 이벤트 처리기 등록.
    li.querySelector(`option[value="${priority == 'FIRST' ? 1 : priority == 'SECOND' ? 2 : 0}"]`).setAttribute('selected', '')
    li.querySelector('select').addEventListener('change', changeTodoElementPriority)
    // 해당 할 일에 대한 클릭(완료 상태 토글, 삭제), 더블클릭(편집모드 진입), 키 입력(편집모드 종료, 변경내역 반영) 이벤트 처리기 등록.
    li.addEventListener('click', onTodoElementClicked)
    li.addEventListener('dblclick', onTodoElementDblclicked)
    li.addEventListener('keyup', onTodoElementKeyupped)
    todoList.append(li)
    // 만약 해당 할 일이 완료된 할 일이라면 토글.
    // 이번에는 Event를 발생시키지 않음!! 이벤트 처리기 때문에 토글이 풀리는 문제가 발생.
    if(isCompleted){
        li.querySelector('input.toggle').setAttribute('checked', '')
        li.classList.add('completed')
    }
    updateCountText()
}


// 모든 할 일들 제거.
async function onRemoveAllTodoClick(event) {
    if(await deteleAllTodoElement(getActiveUserID())){
        clearTodoList()
    } else {
        // TODO: notify user that operation is failed.
    }
}


// 할 일을 클릭했을때 이벤트 위임.
function onTodoElementClicked(event){
    if(!event.target){
        return
    }

    if(event.target.nodeName === 'INPUT' &&
       event.target.classList.contains('toggle')){
        toggleTodoElementStatus(event)
    } else if(event.target.nodeName === 'BUTTON'){
        removeCurrentTodoElement(event)
    }
}

// 할 일을 더블클릭했을때 이벤트 위임.
function onTodoElementDblclicked(event){
    if(event.target && event.target.nodeName === 'LABEL'){
        toggleTodoElementMode(event)
    }
}

// 할 일을 조작 중 키를 입력했을때 이벤트 위임.
function onTodoElementKeyupped(event){
    if(event.target && event.target.nodeName === 'INPUT'){
        updateTodoEdit(event)
    }
}


function changeTodoElementPriority({ target }){
    const selectedPriority = parseInt(target.value) // 선택된 option 값은 select 요소의 value로 존재!
    const userID = getActiveUserID()
    const todoElementID = target.closest('li').getAttribute('id')
    switch(selectedPriority){
        case 1:
            target.classList.remove('secondary')
            target.classList.add('primary')
            break
        case 2:
            target.classList.remove('primary')
            target.classList.add('secondary')
            break
        default:
            target.classList.remove('primary')
            target.classList.remove('secondary')
    }

    updateTodoElementPriority(userID, todoElementID, selectedPriority == 0 ? 'NONE' : selectedPriority == 1 ? 'FIRST' : 'SECOND')
}



// 할 일 완료 여부 체크/체크 해제 시 속성 부여, 제거 로직.
function toggleTodoElementStatus({ target }){
    target.toggleAttribute('checked')
    const todoElement = target.closest('li')
    todoElement.classList.toggle('completed')
    updateTodoElementStatus(getActiveUserID(), todoElement.id)
    // 현재 필터에 따라 할 일이 출력되거나 숨겨지도록 이벤트 발생.
    applySelectedFilter()
    updateCountText()
}


// 할 일 삭제 이벤트 처리기.
function removeCurrentTodoElement({ target }){
    const todoElement = target.closest('li')
    const itemID = todoElement.id
    deleteTodoElement(getActiveUserID(), itemID)
    target.closest('li').remove()
    updateCountText()
}


// 할 일을 더블클릭 했을 때 편집 모드 토글.
function toggleTodoElementMode({ target }){
    target.closest('li').classList.toggle('editing')
}


// 할 일 변경 이벤트 처리기.
async function updateTodoEdit({ target, key }){
    const todoElement = target.closest('li')
    if(key === 'Escape'){
        todoElement.classList.toggle('editing')
    } else if (key === 'Enter'){
        const newTodoText = target.value.trimStart().trimEnd()        
        if(newTodoText.length === 0){
            target.focus()
        }
        
        if(await checkDuplicates(getActiveUserID(), newTodoText)){
            alert('That ToDo already exists!')
            return
        }

        await updateTodoElementText(getActiveUserID(), todoElement.id, newTodoText)
        // HTML 요소에서도 변경사항 적용 후 편집모드 종료.
        todoElement.querySelector('div label span').innerText = newTodoText
        todoElement.classList.toggle('editing')
    }
}


function getActiveUserID(){
    const selectedUser = document.querySelector('div#user-list button.active')
    return selectedUser === null ? null : selectedUser.id
}

function applySelectedFilter(){
    getSelectedFilter().dispatchEvent(new Event('click', {bubbles: true}))
}

function getSelectedFilter(){
    return document.querySelector('ul.filters li a[class*="selected"')
}

function showTodoListLoadingAnimation(){
    const animationElement = `
    <li>
        <div class="view">
        <label class="label">
            <div class="animated-background">
            <div class="skel-mask-container">
                <div class="skel-mask"></div>
            </div>
            </div>
        </label>
        </div>
    </li>`
    clearTodoList(animationElement)
}

function clearTodoList(clearValue=''){
    document.querySelector('ul.todo-list').innerHTML = clearValue
    updateCountText()
}