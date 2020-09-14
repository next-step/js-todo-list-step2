import {userApi} from "../../service/UserApi.js";
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
export class TodoList {
    constructor({
                    $todoList,
                    username,
                    onToggleHandler,
                    onRemoveHandler,
                    onEditHandler,
                    onPriorityHandler,
                    onDeleteHandler
                }) {
        this.$todoList = $todoList;
        this.username = username;

        this.$todoList.addEventListener('dblclick' , e=>{
            if(e.target.className === 'label'){
                const $li = e.target.closest('li');
                $li.className = 'editing';
                $li.querySelector('.edit').focus();
            }
        })

        this.$todoList.addEventListener('click' , e=>{
            const id = e.target.closest('li').dataset.id;
            if(e.target.className === 'toggle' ){
                onToggleHandler(id);
            }
            if(e.target.className === 'destroy'){
                onRemoveHandler(id);
            }
            if(e.target.className === 'delete'){
                onDeleteHandler(id);
            }

        });
        this.$todoList.addEventListener('focusout' , e=>{
            if(e.target.className === 'edit'){

            }
        });
        this.$todoList.addEventListener('keyup' , e=>{
            if(e.target.className === 'edit'){
                const $li = e.target.closest('li');
                if(e.key === 'Enter'){
                    if(e.target.value){
                        onEditHandler($li.dataset , e.target.value);

                    }
                }
                if(e.key === 'Escape'){
                    e.target.value ='';
                }
            }
        })

    }

    setState(selectUser) {
        this.username = selectUser;
        this.render();
    }

    render() {
        this.renderLoading();
        try {
            const response = userApi.getUserTodoItem(this.username).then(data => data);
            this.$todoList.innerHTML = todoListTemplate(response);
        } catch (e) {
            this.$todoList.innerHTML = '';
            console.log(`error : ${e}`)
        }
    }

    renderLoading() {
        this.$todoList.insertAdjacentHTML('beforeend', loadingTemplate())
    }

}
