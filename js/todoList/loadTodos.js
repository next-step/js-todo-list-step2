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
                        </select>
                        ${contents}
                    </label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value=${contents} />
            </li>`;
};

export const loadTodos = async (userId) => {
    const userTodos = await API.getUserTodos(userId);

    const $todoList = document.querySelector('.todo-list');
    const $userTitle = document.querySelector('#user-title strong');
    
    const userName = userTodos.name;
    const userTodoList = userTodos.todoList;
    
    $todoList.innerHTML = userTodoList.map((todo) => todoTemplate(todo)).join('');
    $userTitle.innerText = userName;
};