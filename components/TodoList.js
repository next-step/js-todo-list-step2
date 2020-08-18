export default function TodoList({
    elementId,
    todoList
}) {
    this.init = () => {
        this.state = {
            $todoList: document.querySelector(`.${elementId}`),
            todoList
        }
    }
}