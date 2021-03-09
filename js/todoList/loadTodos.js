import { API } from '../api.js';

const todoTemplate = ({ _id, contents, isCompleted, priority }) => {
    return `<li data-id=${_id} class=${isCompleted? 'completed':''}>
        <div class="view">
            <input class="toggle" type="checkbox" ${isCompleted? 'checked':''}/>
            <label class="label">
                <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                </select>${contents}
            </label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value=${contents} />
    </li>`;
};

const filterTodos = (todos, option) => {
    const filters = {
        all: () => todos,
        active: () => todos.filter((todo) => todo.isCompleted === false),
        completed: () => todos.filter((todo) => todo.isCompleted === true),
    };

    return filters[option]();
};

export const loadTodos = async (userId, option = 'all') => {
    const userTodos = await API.getUserTodos(userId);

    const $todoList = document.querySelector('.todo-list');
    const $userTitle = document.querySelector('#user-title strong');
    const $todoCount = document.querySelector(".todo-count > strong");
    
    const userName = userTodos.name;
    const userTodoList = userTodos.todoList;
    
    const currentTodoList = filterTodos(userTodoList, option);

    $todoList.innerHTML = currentTodoList.map((todo) => todoTemplate(todo)).join('');
    $userTitle.innerText = userName;

    $todoCount.innerText = currentTodoList.length;
};
