export default function TodoList($element, { deleteTodo, checkTodo, editTodo, changeTodoPriority}) {

    const onClickTodo = ({target}) => {
        if(target.classList.contains('toggle') && target.nodeName === 'INPUT'){
            const $li = target.closest('li');
            checkTodo($li.id);
        }

        if(target.classList.contains('destroy') && target.nodeName === 'BUTTON'){
            const $li = target.closest('li');
            deleteTodo($li.id);
        }
    }

    const onDblClickTodo = ({target}) => {
        const $li = target.closest('li');

        if($li.classList.contains('view') && target.nodeName === 'DIV'){
            $element.querySelectorAll('.editing').forEach( $editLabel => {
                $editLabel.classList.remove('editing');
            })

            $li.classList.add('editing');
            const $editInput = $li.querySelector('input.edit');
            $editInput.select();
            $editInput.addEventListener('focusout', () => $li.classList.contains('editing') && $li.classList.remove('editing'));
        }
    }

    const onKeyupTodo = ({target, code}) => {
        const $li = target.closest('li');

        if(target.classList.contains('edit') && target.nodeName === 'LABEL'){
            if(code === 'ENTER' && target.value){
                editTodo($li.id, target.value);
            }
            if(code === 'ESCAPE'){
                $li.classList.contains('editing') && $li.classList.remove('editing')
            }
        }
    }

    const onChangePriority = ({target}) => {
        if(target.classList.contains('select') && target.nodeName === 'SELECT'){
            const $li = target.closest('li');
            changeTodoPriority($li.id, target.value);
        }
    }


    this.bindEvents = () => {
        $element.addEventListener('click', onClickTodo);
        $element.addEventListener('dblclick', onDblClickTodo);
        $element.addEventListener('keyup', onKeyupTodo);
        $element.addEventListener('change', onChangePriority);
    }

    this.init = () => {
        this.bindEvents();
    }

    this.init();


    const todoContentsComponent = contents => `
        <span class="contents">${contents}</span>
    `;

    const todoLabelComponent = todo => {
        if(todo.priority === "NONE" || todo.priority === "0"){
            return `
                <select class="chip select">
                    <option value="0" selected>순위</option>
                    <option value="1">1순위</option>
                    <option value="2">2순위</option>
                </select>  
                ${todoContentsComponent(todo.contents)}
            `;
        }else if(todo.priority === "FIRST" || todo.priority === "1"){
            return `
                <span class="chip primary">1순위</span>
                ${todoContentsComponent(todo.contents)}
            `;
        }else if(todo.priority === "SECOND" || todo.priority ==="2"){
            return `
                <span class="chip primary">2순위</span>
                ${todoContentsComponent(todo.contents)}
            `;
        }
    }

    const todoComponent = (todo) =>`
        <li id="${todo._id}" class=${todo.isCompleted ? 'completed' : 'view'}>
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.isCompleted && "checked"}/>
                    <label class="label">
                    ${  
                        todo.isCompleted? 
                        todoContentsComponent(todo.contents)
                        : todoLabelComponent(todo)
                    }
                    </label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="${todo.contents}" />
        </li>
    `;

    const loadingComponent = () => `
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

    this.render = ( todos, loading) => {
        const template = todos.length ? (todos.map(todo => todoComponent(todo))).join("") : [];
        $element.innerHTML = loading? loadingComponent() : template;
    }
}