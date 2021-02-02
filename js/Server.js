import {addTodolistItem} from './AddTodolistItem.js';

const $userList = document.getElementById('user-list');
const $userCreateButton = document.querySelector('.user-create-button')
const $userDeleteButton = document.querySelector('.user-delete-button')

let $userCount =0;
const $baseUrl = 'https://js-todo-list-9ca3a.df.r.appspot.com/'

// 해당 서버에 데이터 가져와 처리
function responseApi(){
    fetch(`${$baseUrl}api/users`)
        .then((response) => response.json())
        .then((myJson)=> {
            $userList.innerHTML = myJson.map(user => `
                <button class="ripple" id=${++$userCount}>${user.name}</button>
            `).join('');
            clickUser();
            $userList.append($userCreateButton);
            $userList.append($userDeleteButton);
            $userCreateButton.addEventListener('click',makeUser);
            $userDeleteButton.addEventListener('click',deleteUser);
        })

};

// 클릭시 생성 혹은 삭제 핸들러 실행
function makeUser(){
    document.querySelector('.user-create-button').addEventListener('click',onUserCreateHandler)
}
function deleteUser(){
    document.querySelector('.user-delete-button').addEventListener('click',onUserDeleteHandler)
}

//추가한 이름을 브라우저 및 서버에 적용
const onUserCreateHandler = () => {
    const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
    // User의 이름은 최소 2글자 이상체크
    if(userName !== null && userName.length>1) {
        const button = document.createElement('button');
        button.innerText = userName;
        button.classList.add('ripple');
        button.setAttribute('id',++$userCount);
        $userList.insertBefore(button, document.querySelector('user-create-button'));
        postUser(userName);

        //추가된 만큼 핸들러 다시 추가
        clickUser();
    }

}

//삭제한 이름을 가진 데이터를 브라우저 및 서버에 적용
const onUserDeleteHandler = ()=>{
    const userName = prompt("삭제하고 싶은 이름을 입력해주세요.");
    document.querySelectorAll('#user-list > button').forEach((x)=>checkToDelete(x,userName))
}
function checkToDelete(x, userName){
    if(x.innerText === userName) {
        if (x.classList.contains('user-create-button') || x.classList.contains('user-delete-button')) {
            alert('삭제 불가능');
        } else if (x.classList.contains('active') == true) {
            alert('활성화 삭제 불가능');
        } else {
            x.remove();
            getUserIdAndDelete(userName);
        }
    }
}

//해당 이름을 가진 내용을 서버에 추가하기
function postUser(name){
    fetch(`${$baseUrl}api/users`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            name : `${name}`
        })
    }).then((response)=>response.json())
        .then(()=>alert('정상작동')).catch(()=>('오류 발생'))
}

//해당 이름을 가진 데이터의 ID를 서버에서 가져온 후 DELETE_USER 함수 실행
function getUserIdAndDelete(name){
    let ID;
    fetch(`${$baseUrl}api/users`)
        .then(response=>response.json())
        .then(data=>{
            data.map((value)=>{
                if(value.name === name)
                    ID = value._id;
            })
            return ID;
        })
        .then((ID)=>{deleteData(ID)});
}

//해당 ID와 같은 내용의 데이터를 삭제
function deleteData(_id){
    fetch(`${$baseUrl}api/users/${_id}`,{method:"DELETE"})
        .then(response=>response.json())
        .then(()=>{alert('서버 데이터 정상 삭제')})
        .catch(()=>{alert('오류 발생')});
}

// 생성된 태그마다의 클릭 핸들러 구현
function clickUser(){
    for(let i=1; i<=$userCount; i++)
    {
        let id = document.getElementById(`${i}`);
        if(id!==null)       //id가 숫자로 제대로 존재한다면 실행 (숫자가 아니라면 실행X)
            id.addEventListener('click',(event)=>OnUserClickHandler(id.innerText,event));
    }
}

//해당 이름을 가진 데이터를 서버에서 TODOITEMS를 가져오기
function OnUserClickHandler(Name,event){
    //클릭한 버튼을 active 상태로 만들고 그전의 버튼을 active 상태 취소
    event.target.parentNode.querySelectorAll('#user-list > button').forEach(x=>x.classList.remove('active'));
    event.target.classList.add('active');
    getUserIdAndTodoitems(Name)
}

//해당 이름을 가진 데이터의 ID를 서버에서 가져온 후 GET_TODOITEMS 함수 실행
function getUserIdAndTodoitems(name){
    let ID;
    fetch(`${$baseUrl}api/users`)
        .then(response=>response.json())
        .then(data=>{
            data.map((value)=>{
                if(value.name === name)
                    ID = value._id;
            })
            return ID;
        })
        .then((ID)=>{getTodoitems(ID)});
}

// TODOITEMS 가져온 내용 출력
function getTodoitems(ID){
    removeLocalStorage();
    removeLiTag();

    fetch(`${$baseUrl}api/users/${ID}/items`)
        .then(response=>response.json())
        .then(data=>data.map(val=>{
            if(val.isCompleted === true)
                addTodolistItem(val.contents,'T')
            else
                addTodolistItem(val.contents,'F')
        }));
}

// 존재하는 모든 localStorage 초기화
function removeLocalStorage(){
    const localStorage_length = localStorage.length;
    const key=[];
    for(let i=0;i<localStorage_length;i++)
    {
        key.push(localStorage.key(i));
    }
    key.map(x=>localStorage.removeItem(x));
}

//모든 li태그 초기화
function removeLiTag(){
    document.querySelector('.todo-count > strong').innerText = 0;
    const todolist =  document.querySelectorAll('.todo-list > li')
    todolist.forEach(x=>x.remove());
}


//   유저 ID 가져온 후 TODOLIST 추가하기 함수 실행
function getUserIdAndAddTodolist(name, content){
    let ID;
    fetch(`${$baseUrl}api/users`)
        .then(response=>response.json())
        .then(data=>{
            data.map((value)=>{
                if(value.name === name)
                    ID = value._id;
            })
            return ID;
        })
        .then((ID)=>{AddTodolist(ID,content)});
}

//서버에 TODOLIST 추가
function AddTodolist(ID, value){
    fetch(`${$baseUrl}api/users/${ID}/items/`,
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                'contents':value})})
        .then(response=>response.json())
        .then((data)=>console.log(data))
        .catch(()=>alert('오류 작동'))
}

// 삭제버튼 클릭시 해당 TODOLIST의 item삭제하는 DELETE_TODOLIST함수 실행
function getUserIdAndDeleteTodolist(name, content){
    let ID,itemID;
    fetch(`${$baseUrl}api/users`)
        .then(response=>response.json())
        .then(data=>{
            data.map((value)=>{

                value['todoList'].forEach(val => {
                    if(val.contents === content && value.name === name)
                    {
                        ID = value._id;
                        itemID = val._id;
                    }
                });
            })
            return [ID,itemID];
        })
        .then(([ID,itemID])=>{deleteTodolist(ID,itemID)});
}

//해당되는 ID와 todoitem의 ID를 가져와 처리한다.
function deleteTodolist(ID, itemID){
    fetch(`${$baseUrl}api/users/${ID}/items/${itemID}`,
        {
            method:"DELETE",
        })
        .then(response=>response.json())
        .then((data)=>console.log(data))
        .catch(()=>alert('오류 작동'))
}

// 체크박스 버튼 클릭시 해당 TODOLIST의 ITEM_COMPLETE함수 실행
function getUserIdAndItemComplete(name, content){
    let ID,itemID;
    fetch(`${$baseUrl}api/users`)
        .then(response=>response.json())
        .then(data=>{
            data.map((value)=>{
                value['todoList'].forEach(val => {
                    if(val.contents === content && value.name === name)
                    {
                        ID = value._id;
                        itemID = val._id;
                    }
                });
            })
            return [ID,itemID];
        })
        .then(([ID,itemID])=>{itemComplete(ID,itemID)});
}

//해당되는 ID와 todoitem의 ID를 가져와 처리한다.
function itemComplete(ID, itemID){
    fetch(`${$baseUrl}api/users/${ID}/items/${itemID}/toggle`,
        {
            method:"PUT",
        })
        .then(response=>response.json())
        .then((data)=>console.log(data))
        .catch(()=>alert('오류 작동'))
}



// 체크박스 버튼 클릭시 해당 TODOLIST의 Modify_DOTOLIST함수 실행
function getUserIdAndModifyTodolist(name, Before_Content, After_Content){
    let ID,itemID;
    fetch(`${$baseUrl}api/users`)
        .then(response=>response.json())
        .then(data=>{
            data.map((value)=>{
                value['todoList'].forEach(val => {
                    if(val.contents === Before_Content && value.name === name)
                    {
                        ID = value._id;
                        itemID = val._id;
                    }
                });
            })
            return [ID,itemID,After_Content];
        })
        .then(([ID,itemID,After_Content])=>{modifyTodolist(ID,itemID,After_Content)});
}

//해당되는 ID와 todoitem의 ID를 가져와 처리한다.
function modifyTodolist(ID, itemID, After_Content){
    fetch(`${$baseUrl}api/users/${ID}/items/${itemID}`,
        {
            method:"PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({
                'contents':After_Content})
        })
        .then(response=>{
            return response.json()
        })
        .then((data)=>console.log(data))
        .catch(()=>alert('오류 작동'))
}


export {responseApi,
    getUserIdAndDeleteTodolist,
    getUserIdAndItemComplete,
    getUserIdAndModifyTodolist,
    getUserIdAndAddTodolist,
};
