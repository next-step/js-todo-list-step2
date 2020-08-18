import TodoList from './TodoList.js';

export default function App() {
    this.init = () => {
        this.state = {
            todoList: [
                {
                    _id: 0,
                    contents: '테스트용',
                    isCompleted: false
                }
            ],
        }
        this.todoList = new TodoList({
            elementId: 'todo-list',
            todoList: this.state.todoList,
        });
    }

    try {
        this.init();
    } catch {}
}