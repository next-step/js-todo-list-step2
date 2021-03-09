

export function TodoList($div, context){
    const $todoItems = $div.querySelector('.todo-list');

    const onClickEditing = (event) =>
        event.target.closest("li").classList.add("editing");

    const onClickTodoItem = (event) => {
        const className = event.target.classList;

        if (className.contains("toggle")) {
            context.complete(event.target.closest("li").id);
        }
        if (className.contains("destroy")) {
            context.deleteTodoItem(event.target.closest("li").id);
        }
    };

    const onEdited = (event) => {
        const updateItems ={
            todoItemId : event.target.closest("li").id,
            content : event.target.value,
        } 

        if (event.key === "Enter") {
            context.updateContents(updateItems);
            event.target.closest("li").classList.remove("editing");
        } else if (event.key === "Escape") {
            event.target.closest("li").classList.remove("editing");
        }
    };

    $todoItems.addEventListener("click", onClickTodoItem);
    $todoItems.addEventListener("dblclick", onClickEditing);
    $todoItems.addEventListener("keyup", onEdited);


    this.render = (todoItems) => {
        $todoItems.innerHTML = todoItems.map(todoItem => renderHTML(todoItem))
                                        .join('');
    }

    const renderHTML = (todoItem) => {
        return `<li id=${todoItem._id} class=${todoItem.isCompleted ? "completed" : ""}>
                    <div class="view">
                        <input class="toggle" type="checkbox" ${todoItem.isCompleted ? "checked" : ""}>
                        <label class="label">${todoItem.contents}</label>
                        <button class="destroy"></button>
                    </div>
                   <input class="edit">
                </li>`;
    }

}