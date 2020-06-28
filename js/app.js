const todo_ul = document.querySelector(".todo-list")
const todo_input = document.querySelector(".new-todo") 
const count_span = document.querySelector(".todo-count")
const filt_ul = document.querySelector(".filters")
const all_a = filt_ul.querySelector(".all")
const active_a = filt_ul.querySelector(".active")
const complete_a = filt_ul.querySelector(".completed")
const allDelBtn = document.querySelector(".clear-completed")
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
const selectUi = `
<select class="chip select">
    <option value="0" selected>순위</option>
    <option value="1">1순위</option>
    <option value="2">2순위</option>
</select>
`

async function apiPriority(todo, priority) {
    if (!(currentUser === "guest")) {
        const resTodo = await fetch(APIURL + `${currentUser}/item/${todo._id}/priority/`, {
            method: "PUT",
            headers: {
                'content-Type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify({
                priority
            })
        }).then(function(res){
            return res.json()
        }).then(function(json){
            return json
        })
        todo.priority = resTodo.priority
    }
}

function clickPriority(event) {
    if (event.target.nodeName === "SPAN") {
        const label = event.target.closest("label")
        label.innerHTML = selectUi + label.id
    }
}

function changePriority(event) {
    if (event.target.nodeName === "SELECT") {
        const label = event.target.closest("label")
        const li = event.target.closest("li")
        const todo = findTodo(li)
        const priorituUi = todoPriority(parseInt(event.target.value))   
        label.innerHTML = priorituUi + label.id
        apiPriority(todo, parseInt(event.target.value))
    }
}

function apiDelAllTodo(event) {
    if (!(currentUser === "guest")) {
        fetch(APIURL + `${currentUser}/items/`, {
            method: "DELETE"
        })
        todo_list = []
        allClear()
        countTodo()
    } else {
        todo_list = []
        allClear()
        countTodo()
    }
}

function apiCheck(todoId) {
    if (!(currentUser === "guest")) {
        fetch(APIURL + `${currentUser}/item/${todoId}/toggle/`, {
            method: "PUT"
        })
    }
}

function apiEdit(todoId, editTodo) {
    if (!(currentUser === "guest")) {
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
}

function apiDelTodo(todoId) {
    if (!(currentUser === "guest")) {
        fetch(APIURL + `${currentUser}/item/${todoId}`, {
            method: "DELETE"
        })
        countTodo()
    }
}

async function apiLoadUser() {
    const waitUi = `
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
        </li>
        `
    todo_ul.innerHTML = waitUi
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
    todo_ul.innerHTML = ""
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
            event.target.value = label.id
        } else if (event.key === ENTER) {
            if (!checkBlank(event.target.value)) {
                const todo = findTodo(li)
                const priorityUi = todoPriority(todo.priority)
                label.innerHTML = priorityUi + event.target.value
                label.id = event.target.value
                li.classList.remove("editing")
                todo.contents = event.target.value
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
        const todo = findTodo(li)
        const priorityUi = todoPriority(todo.priority)
        const label = li.querySelector("label")
        if (event.target.checked) {
            li.classList.add("completed")
            todo.isCompleted = true
            label.innerHTML = label.id
        } else {
            li.classList.remove("completed")
            todo.isCompleted = false
            label.innerHTML = priorityUi + label.id
        }
        apiCheck(todo._id)
    }
}

function makeTodoObj(current_todo, boolean) {
    todo = {
        'contents': current_todo,
        "isCompleted": boolean,
        '_id': id,
        'priority': 0
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

function todoPriority(priority) {
    if (priority === 0) {
        return selectUi
    } else if (priority === 1) {
        return `
        <span class="chip primary">1순위</span>
        `
    } else if(priority === 2) {
        return `
        <span class="chip secondary">2순위</span>
        `
    }
}

function drawTodo(todo) {
    const todoPriorityUi = todoPriority(todo.priority)
    const todoItemTemplate = function(todo, complete, checked, select){
        return `
        <li id=${todo._id} class=${complete}>
            <div class="view">
                <input class="toggle" type="checkbox" ${checked} />
                <label class="label" id="${todo.contents}">
                    ${select}
                    ${todo.contents}
                </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.contents}" />
        </li>
        `
    }
    if (todo.isCompleted) {
        const todoItem = todoItemTemplate(todo, "completed", "checked", "")
        todo_ul.innerHTML += todoItem
    } else {
        const todoItem = todoItemTemplate(todo, "", "", todoPriorityUi)
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
    todo_ul.addEventListener("change", changePriority)
    todo_ul.addEventListener("click", clickPriority)
    userInput.addEventListener("keyup", addNewUser)
    allDelBtn.addEventListener("click", apiDelAllTodo)
    apiLoadUserList()
   
}

init()
