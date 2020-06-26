const todo_ul = document.querySelector(".todo-list")
const todo_input = document.querySelector(".new-todo") 
const count_span = document.querySelector(".todo-count")
const filt_ul = document.querySelector(".filters")
const all_a = filt_ul.querySelector(".all")
const active_a = filt_ul.querySelector(".active")
const complete_a = filt_ul.querySelector(".completed")
const userDiv = document.querySelector("#user-list") 
const userInput = document.querySelector(".adduser")
const userH1 = document.querySelector("#user-title")
const ENTER = "Enter"
const ESC = "Escape"
const ALL = "all"
const ACTIVE = 'active'
const COMPLETED = 'completed'
const APIURL = 'https://blackcoffee-todolist.df.r.appspot.com/api/u/'
let userList = []
let todo_list = []
let id = 0
let userId = 0
let currentUser = "guest"

function apiCheck(todoId) {
    fetch(APIURL + `${currentUser}/item/${todoId}/toggle/`, {
        method: "PUT"
    })
}

function apiEdit(todoId, editTodo) {
    fetch(APIURL + `${currentUser}/item/${todoId}/`, {
        method: "PUT",
        headers: {
            'content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
            contents: editTodo
        })
    })
}

function apiDelTodo(todoId) {
    fetch(APIURL + `${currentUser}/item/${todoId}`, {
        method: "DELETE"
    })
    countTodo()
}

async function apiLoadUser() {
    const user = await fetch(APIURL + `${currentUser}/item/`).then(function(res){
        return res.json()
    }).then(function(user){
        return user
    })
    todo_list = user.todoList
    loadTodo()
    countTodo()
} 

function loadTodo() {
    todo_list.forEach(function(todo){
        drawTodo(todo)
    })
}

function findUser(btn) {
    return userList.find(user => user._id == btn.id)
}

function clickUser(event){
    const btn = event.target
    const user = findUser(btn)
    currentUser = user.name
    delActiveUser()
    allClear()
    apiLoadUser()
    btn.classList.add("active")
    userH1.innerHTML = `<span><strong>${currentUser}</strong>'s Todo List</span>`
}

function makeUserObj(userName){
    const user = {
        "_id": id,
        'name': userName 
    }
    userId = userId + 1
    userList.push(user)
    drawUser(user)
}

function addNewUser(event) {
    if (event.key === ENTER) {
        valueUser = event.target.value
        event.target.value = ""
        fetch(APIURL + `${valueUser}/item/`, {
            method: "POST",
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                contents: "새로운 유저가 되신것을 환영합니다~"
            })
        })
        makeUserObj(valueUser)
    }
}

function delActiveUser() {
    const userBtnList = userDiv.querySelectorAll('*')
    userBtnList.forEach(function(user){
        user.classList.remove("active")
    })
}

function addUser(){
    userList.forEach(function(user){
        drawUser(user)
    })
}

function drawUser(user) {
    const btn = document.createElement("button")
    btn.classList.add("ripple")
    btn.id = user._id
    btn.innerText = user.name
    btn.addEventListener("click", clickUser)
    userDiv.appendChild(btn)
}

async function apiLoadUserList() {
    userList = await fetch(APIURL)
    .then(function(res){
        return res.json()
    }).then(function(user){
        return user
    })
    addUser()
}

async function apiSaveTodo(todo) {
    if (!(currentUser === "guest")) {
        const apiTodo = await fetch(APIURL + `${currentUser}/item/`, {
            method: "POST",
            headers: {
                'content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                contents: todo
            })
        }).then(function(res){
            return res.json()
        }).then(function(todo){
            return todo
        })
        todo_list.push(apiTodo)
        return apiTodo
    }
}

function allClear() {
    todo_ul.innerHTML = ""
    all_a.classList.remove("selected")
    active_a.classList.remove("selected")
    complete_a.classList.remove("selected")
}

function viewFilter(event) {
    event.preventDefault()
    allClear()
    filterTodo(event.target.classList[0]).forEach(function(todo){
        drawTodo(todo)
    })
}

function filterTodo(click_btn) {
    const filter_todo = todo_list.filter(function(todo){
        if (click_btn === ALL) {
            all_a.classList.add("selected")
            return true
        } else if (click_btn === ACTIVE) {
            active_a.classList.add("selected")
            return !todo.isCompleted
        } else if (click_btn === COMPLETED) {
            complete_a.classList.add("selected")
            return todo.isCompleted
        }
    })
    return filter_todo
}

function countTodo() {
    const total_todo = todo_list.length
    count_span.innerText = `총 ${total_todo} 개`
}

function deleteTodo(event) {
    if (event.target.nodeName === "BUTTON") {
        const li = event.target.closest("li")
        const todo = findTodo(li)
        todo_list.splice(todo_list.indexOf(todo), 1)
        todo_ul.removeChild(li)
        apiDelTodo(todo._id)
    }
}

function editingTodo(event) {
    if (event.target.nodeName === "INPUT" && event.target.classList[0] === "edit") {
        const li = event.target.parentElement
        const label = li.querySelector(".label")
        if (event.key === ESC) {
            li.classList.remove("editing")
            event.target.value = label.innerText
        } else if (event.key === ENTER) {
            if (!checkBlank(event.target.value)) {
                todo = findTodo(li)
                label.innerText = event.target.value
                li.classList.remove("editing")
                todo.contents = label.innerText
                apiEdit(todo._id, todo.contents)
            }
        }
    }
}

function editTodo(event) {
    if (event.target.nodeName === "LABEL") {
        const li = event.target.closest("li")
        li.classList.add("editing")
    }
}

function findTodo(li) {
    return todo_list.find(todo => todo._id == li.id)
}

function todoComplete(event) {
    if (event.target.nodeName === "INPUT" && event.target.classList[0] === "toggle") {
        const li = event.target.closest("li")
        todo = findTodo(li)
        if (event.target.checked) {
            li.classList.add("completed")
            todo.isCompleted = true
        } else {
            li.classList.remove("completed")
            todo.isCompleted = false
        }
        apiCheck(todo._id)
    }
}

function makeTodoObj(current_todo, boolean) {
    todo = {
        'contents': current_todo,
        "isCompleted": boolean,
        '_id': id
    }
    id = id + 1
    todo_list.push(todo)
    return todo
}

function checkBlank(input_value){
    return !input_value
}

async function inputTodo(event) {
    if (event.key === ENTER) {
        current_todo = todo_input.value
        todo_input.value = ""
        if (!checkBlank(current_todo)) {
            if (currentUser === "guest") {
                const todo = makeTodoObj(current_todo, false)
                drawTodo(todo)
                countTodo()
            } else {
                const todo = await apiSaveTodo(current_todo)
                drawTodo(todo)
                countTodo()
            }
        }
    }
}

function drawTodo(todo) {
    const todoItemTemplate = function(todo, complete, checked){
        return `
        <li id=${todo._id} class=${complete}>
            <div class="view">
                <input class="toggle" type="checkbox" ${checked} />
                <label class="label">${todo.contents}</label>
                <button class="delete"></button>
            </div>
            <input class="edit" value="${todo.contents}" />
        </li>
        `
    }
    if (todo.isCompleted) {
        const todoItem = todoItemTemplate(todo, "completed", "checked")
        todo_ul.innerHTML += todoItem
    } else {
        const todoItem = todoItemTemplate(todo, "", "")
        todo_ul.innerHTML += todoItem
    } 
}

function init() {
    todo_input.addEventListener("keyup", inputTodo)
    all_a.addEventListener("click", viewFilter)
    active_a.addEventListener("click", viewFilter)
    complete_a.addEventListener("click", viewFilter)
    todo_ul.addEventListener("change", todoComplete)
    todo_ul.addEventListener("keyup", editingTodo)
    todo_ul.addEventListener("dblclick", editTodo)
    todo_ul.addEventListener("click", deleteTodo)
    userInput.addEventListener("keyup", addNewUser)
    apiLoadUserList()
   
}

init()
