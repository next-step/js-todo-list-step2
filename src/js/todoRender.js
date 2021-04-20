import * as api from "./api.js";

async function todoRender() {
    let activeUser = document.querySelector(".active.ripple");
    // "-LDXT6ltH"

    let activeTodos = await api.getTodo("-LDXT6ltH");
    // let activeTodos = await api.getTodo(activeUser.id);
    console.log(activeTodos)
    // todoList.innerHTML = "";
    activeTodos.map(function(v) {
        let todoList = document.querySelector(".todo-list")
        let contents = v.contents;
        let completed = v.isCompleted;
        let priority = v.priority;
        let id = v._id;
        let completedHTML = document.createElement("input")
        let priorityHTML = document.createElement("label")
        priorityHTML.className = "label"
        let buttonHTML = document.createElement("button")
        buttonHTML.className = "destory"
        if(completed){
            completedHTML.innerHTML = `
            <input class="toggle" type="checkbox" checked>
            `
        } else {
            completedHTML.innerHTML = `
            <input class="toggle" type="checkbox">
            `
        }

        if(priority === "none") {
            priority = "select"
        } else if( priority === "first"){
            priority = "primary"
        } else {
            priority = "secondary"
        }
        priorityHTML.innerHTML = `
                <select classs="chip ${priority}">
                    <option value="0">순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                </select>
                ${contents}
        `
        

        let newLi = document.createElement("li")
        let newDiv = document.createElement("div");
        newDiv.className = "view";
        newDiv.append(completedHTML)
        newLi.append(newDiv)
        // completedHTML.append(priorityHTML)
        // .append(buttonHTML)
        // newDiv.append(completedHTML)
        // console.log(todoList)
        todoList.appendChild(newLi)


        // const todoList = document.querySelector(".todo-list")
        // const newLi = document.createElement("li");
        // const newDiv = document.createElement("div");
        // newDiv.className = "view"
        // newDiv.innerHTML=`
        //     <input class="toggle" type="checkbox">
        //     <label calss="label">
        //         <select classs="chip select">
        //             <option value="0">순위</option>
        //             <option value="1">1순위</option>
        //             <option value="2">2순위</option>
        //         </select>
        //         ????
        //     </label>
        // `
        // const newButton = document.createElement("button")
        // newButton.className="destory"
        // newDiv.append(newButton)
        // newLi.appendChild(newDiv);
        // todoList.append(newLi)
    })
}

export { todoRender }


// contents: "123"
// isCompleted: false
// priority: "NONE"
// _id: "NyKkcycqi"
    