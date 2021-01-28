import {serverURL} from './common.js'


export function getActiveUserID(){
    const selectedUser = document.querySelector('div#user-list button.active')
    return selectedUser === null ? null : selectedUser.id
}

export async function loadUser(userid){
    let userInfo = {}
    await fetch(`${serverURL}/api/users/${userid}`)
        .then(data => {return data.json()})
        .then(jsonResponse => {
            if(jsonResponse.message){
                throw new Error(jsonResponse.message)
            }
            userInfo = jsonResponse 
        })
        .catch(error => alert(error))
    return userInfo
}


export async function loadUsers(){
    let todoListBulk = []
    await fetch(`${serverURL}/api/users`)
        .then(data => { return data.json() })
        .then(jsonResponse => todoListBulk = jsonResponse)
        .catch(() => loadUsers())
    return todoListBulk
}


export async function addUser(newUsername){
    let addedUserInfo = {}
    await fetch(`${serverURL}/api/users`, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'name':newUsername})})
        .then(returnValue => { return returnValue.json() })
        .then(jsonResponse => { addedUserInfo = jsonResponse })

    return addedUserInfo
}


export function deleteUser(userid){
    fetch(`${serverURL}/api/users/${userid}`, {
        method: 'DELETE'
    })
}


export async function loadTodoList(userid){
    let todoList = []
    await fetch(`${serverURL}/api/users/${userid}/items/`)
        .then(data => { return data.json() })
        .then(jsonResponse => todoList = responseChecker(jsonResponse))
        .catch(error => alert(error))
    return todoList
}


export async function addTodoElement(userid, text){
    let todoElement = {}
    await fetch(`${serverURL}/api/users/${userid}/items/`, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({'contents':text})})
        .then(data => { return data.json() })
        .then(jsonResponse => todoElement = responseChecker(jsonResponse))
        .catch(error => alert(error))
    return todoElement
}


export async function deteleAllTodoElement(userid){
    let result = false
    await fetch(`${serverURL}/api/users/${userid}/items/`, {
        method: 'DELETE'
    })
    .then(data => { return data.json() })
    .then(jsonResponse => result = jsonResponse.success)
    return result
}


export async function deleteTodoElement(userid, itemid){
    await fetch(`${serverURL}/api/users/${userid}/items/${itemid}`, {
        method: 'DELETE'
    })
}


export async function updateTodoElementText(userid, itemid, text){
    let updatedTodoElement = {}
    await fetch(`${serverURL}/api/users/${userid}/items/${itemid}`, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({'contents':text})})
        .then(data => { return data.json() })
        .then(jsonResponse => updatedTodoElement = responseChecker(jsonResponse))
        .catch(error => alert(error))
    return updatedTodoElement
}


export async function updateTodoElementPriority(userid, itemid, priority){
    let updatedTodoElement = {}
    await fetch(`${serverURL}/api/users/${userid}/items/${itemid}/priority`, {
        method: 'PUT',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({'priority':priority})})
        .then(data => { return data.json() })
        .then(jsonResponse => updatedTodoElement = responseChecker(jsonResponse))
        .catch(error => alert(error))
    return updatedTodoElement
}


export async function updateTodoElementStatus(userid, itemid){
    let updatedTodoElement = {}
    await fetch(`${serverURL}/api/users/${userid}/items/${itemid}/toggle`, {
        method: 'PUT'})
        .then(data => { return data.json() })
        .then(jsonResponse => updatedTodoElement = responseChecker(jsonResponse))
        .catch(error => alert(error))
    return updatedTodoElement
}


// 함수를 넘겨서 jsonResponse에 대해 좀 더 세부적으로 검사할 수 있도록?
function responseChecker(jsonResponse){
    if(jsonResponse.message){
        throw new Error(jsonResponse.message)
    } 
    return jsonResponse
}