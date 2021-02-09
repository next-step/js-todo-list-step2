import { API } from '../api.js';

export const loadTodos = async (userId) => {
    const userTodos = await API.getUserTodos(userId);
    console.log(userTodos);
    
    const userName = userTodos.name;
    const userTodoList = userTodos.todoList;

    const $todoList = document.querySelector('.todo-list');
    $todoList.innerHTML = userTodoList.map(({ _id, contents, isCompleted, priority }) => (`
        <li data-id=${_id} class=${isCompleted? 'completed':''}>
            <div class="view">
                <input class="toggle" type="checkbox" />
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
            <input class="edit" value="완료된 타이틀" />
        </li>
    `)
    ).join('');

    const $userTitle = document.querySelector('#user-title strong');
    $userTitle.innerText = userName;
    
};