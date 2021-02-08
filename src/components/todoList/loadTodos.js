import {API} from '../../api/api.js';

const todoCount = (todos) => {
    const $todoCountStrong = document.querySelector('.todo-count strong');
    $todoCountStrong.innerHTML = todos.length;
};

const priorityTemplate = (priority) => {
    const priorityList = {
        FIRST : 'primary',
        SECOND : 'secondary',
        NONE : '',
    }
    return `<select class="chip select ${priorityList[priority]}">
                <option value="0" ${priority === 'NONE' ? 'selected' : ''}>순위</option>
                <option value="1" ${priority === 'FIRST' ? 'selected' : ''}>1순위</option>
                <option value="2" ${priority === 'SECOND' ? 'selected' : ''}>2순위</option>
            </select>`;
};

export const todoListTemplate =(todo) => {
    return `<li id=${todo._id} class=${todo.isCompleted ? 'completed' : ''}>
                <div class="view">
                <input class="toggle" type="checkbox" ${todo.isCompleted ? 'checked' : ''}/>
                <label class="label">
                    ${priorityTemplate(todo.priority)}
                    ${todo.contents}
                </label>
                <button class="destroy"></button>
                </div>
                <input class="edit" value="${todo.contents}" />
            </li>`;

};

const progressTemplate = () => {
    return `<li>
                <div class="view">
                <label class="label">
                    <div class="animated-background">
                    <div class="skel-mask-container">
                        <div class="skel-mask"></div>
                    </div>
                    </div>
                </label>
                </div>
            </li>`;
}                                 

const renderTitle = (name) => {
    const $userTitle = document.querySelector('#user-title strong');
    $userTitle.innerHTML = name;
};

const renderTodos = (todos) => {
    const $todoList = document.querySelector('.todo-list');

    $todoList.innerHTML = '';
    $todoList.insertAdjacentHTML('beforeend', progressTemplate());
    todos.map((todo) => {
        $todoList.insertAdjacentHTML('beforeend', todoListTemplate(todo));
    });
};

const filterTodos =(todos, option) => {
    const filters = {
        all : () => todos,
        active : () => todos.filter((todo) => todo.isCompleted === false),
        completed : () => todos.filter((todo) => todo.isCompleted === true),
    };
    return filters[option]();
};

export const loadTodos = async (userId, option = 'all') => {
    const user = await API.getUser(userId);
    const todos =await filterTodos(user.todoList, option);

    renderTitle(user.name);
    renderTodos(todos);
    todoCount(todos);
}

