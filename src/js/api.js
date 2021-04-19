const baseUrl = "https://js-todo-list-9ca3a.df.r.appspot.com";

async function getUserList(){
    const method = "/api/users";
    const requestUrl = baseUrl + method;
    const response = await fetch(requestUrl);
    return response.json()
}

function addUser(userName) {
    const method = "/api/users";
    const requestUrl = baseUrl + method;
    fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: userName,
        }),
    }).then((response) => console.log(response))
}

async function getUser(id) {
    const method = "/api/users/" + id ;
    const requestUrl = baseUrl + method;
    const response = await fetch(requestUrl);
    return response.json()
}

async function delUser(id) {
    const method = "/api/users/" + id ;
    const requestUrl = baseUrl + method;
    await fetch(requestUrl, {method:"DELETE"});
};

async function getTodo(id) {
    const method = "/api/users/" + id + "/items";
    const requestUrl = baseUrl + method;
    const response = await fetch(requestUrl);
    return response.json()
}

function addTodo(id, items) {
    const method = "/api/users/" + id + "/items";
    const requestUrl = baseUrl + method;
    fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: items,
        }),
    }).then((response) => console.log(response))
}

async function delTodoAll(id) {
    const method = "/api/users/" + id +"/items" ;
    const requestUrl = baseUrl + method;
    await fetch(requestUrl, {method:"DELETE"});
};

async function delTodo(id, itemId) {
    const method = "/api/users/" + id +"/items/" + itemId ;
    const requestUrl = baseUrl + method;
    await fetch(requestUrl, {method:"DELETE"});

};

async function modTodo(id, itemId, items) {
    const method = "/api/users/" + id + "/items/" + itemId;
    const requestUrl = baseUrl + method;
    fetch(requestUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: items,
        }),
    }).then((response) => console.log(response))

};

async function setTodoPriority(id, itemId, priority) {
    const method = "/api/users/" + id + "/items/" + itemId + "/priority";
    const requestUrl = baseUrl + method;
    fetch(requestUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            priority: priority,
        }),
    }).then((response) => console.log(response))

};

async function getTodoComplete(id, itemId) {
    const method = "/api/users/" + id;
    const requestUrl = baseUrl + method;
    const response = await fetch(requestUrl);
    const data = await response.json()
    data.todoList.map(function(v) {
        if(v._id === itemId) {
            return v.isCompleted
        }
    })
};

async function setTodoComplete(id, itemId) {
    const method = "/api/users/" + id + "/items/" + itemId + "/toggle";
    const requestUrl = baseUrl + method;
    let result = !getTodoComplete(id,itemId);
    fetch(requestUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
           isCompleted: result
        }),
    }).then((response) => console.log(response))
};

export {
    getUserList,
    addUser,
    getUser,
    delUser,
    getTodo,
    addTodo,
    delTodoAll,
    delTodo,
    modTodo,
    setTodoPriority,
    getTodoComplete,
    setTodoComplete,
}
    