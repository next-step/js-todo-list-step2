export function TodoInput($div, context) {
    const $todoInput = $div.querySelector('.new-todo');

    const addTodoItem = (event) => {
        const $newTodoTarget = event.target;
        if (event.key === "Enter") {
            context.saveItem($newTodoTarget.value);
            $todoInput.value = "";
        }
    };

    $todoInput.addEventListener("keypress", addTodoItem);
}
