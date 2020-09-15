import {userApi} from "../../service/UserApi.js";
import {Component} from "../../core/Component.js";
const priority= {
    NONE : '0',
    FIRST : '1',
    SECOND : '2',

}
const loadingTemplate = () => `
     <li>
          <div class="view">
            <label class="label">
              <div class="animated-background">
                <div class="skel-mask-container">
                  <div class="skel-mask"></div>
                </div>
              </div>
            </label>
          </div>
        </li>
    `

const todoListArrayTemplate = todoArray => {
    todoArray
        .map((todo) =>
            todoListTemplate(todo.isCompleted, todo.id, priorityTemplate[todo.priority], todo.contents)
        ).join('');
}

const todoListTemplate = (isCompleted, id, todoPriorityTemplate, contents) => {
    return `
        <li ${isCompleted ? 'class=completed' : ''} data-id=${id}
            <div class="view">
                <input class="toggle" type="checkbox" ${isCompleted ? 'checked' : ''}/>
                <label class="label">
                    ${todoPriorityTemplate}
                    ${contents}
                </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" placeholder="${contents}" value="" />
        </li>          
    `;
}

const priorityTemplate = {
    [priority.NONE]: `<select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
        </select>
    `,
    [priority.FIRST]: `<select class="chip select">
            <option value="0" >순위</option>
            <option value="1" selected>1순위</option>
            <option value="2">2순위</option>
        </select>
    `,
    [priority.SECOND]: `<select class="chip select">
            <option value="0" >순위</option>
            <option value="1">1순위</option>
            <option value="2" selected>2순위</option>
        </select>
    `,

}
const onToggle = (target) => {
    target.classList.remove('editing');
    if (target.querySelector('.toggle').checked) {
        target.classList.add('completed');
        return;
    }
};
export class TodoList extends Component{
    constructor($target , props) {
        super($target , props);
    }


}
