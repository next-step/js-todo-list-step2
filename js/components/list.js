import Component from '../lib/component.js';
import store from '../store/index.js';

const List = class extends Component {

    constructor() {
        super({
            store,
            element : document.querySelector('.todo-list')
        });
    }

    //토글, 삭제
    toDoClick = (e) => {
        const thisToDoId = e.target.parentNode.parentNode.id;
        switch(e.target.className){
            case("toggle") : 
                store.dispatch('toggleToDo', thisToDoId);
                break;
            case("destroy") : 
                store.dispatch('destroyToDo', thisToDoId);
                break;
        }
    }
    //수정 
    toDoEdit = (e) => {
        const thisToDoId = e.target.parentNode.parentNode.id;
        const thisToDo = document.getElementById(thisToDoId);

        thisToDo.className="editing";
        thisToDo.querySelector(".edit").select();
    }

    toDoKeyup = (e) => {
        const thisToDoId = e.target.parentNode.id;
        const thisToDo = document.getElementById(thisToDoId);
        
        switch(e.key){
            case 'Enter':
                store.dispatch('editToDo', {'itemId': thisToDoId, 'contents':e.target.value});
                thisToDo.className="";
                break;
            case 'Escape':
                thisToDo.className="";
                break;
            }
        };
        
    setPriority = (e) => {
        
        if(e.target.nodeName !== 'SELECT') return;

        const optionValue = e.target.options[e.target.selectedIndex].value;
        let priority = '';
        switch(optionValue){
            case('0') : return;
            case('1') : priority = 'FIRST'; break;
            case('2') : priority = 'SECOND'; break;
        }
        const thisToDoId = e.target.parentNode.parentNode.parentNode.id;
            
        store.dispatch('setPriority', {'itemId': thisToDoId, 'priority': priority});

    }

    render(){
        
        if(store.state.todos.todoList.length === 0){
            this.element.innerHTML = `
            <li>
                <div class="view">
                    <label class="label">
                        👀 할 일을 추가해주세요 👀
                    </label>
                </div>
            </li>`
            return;
        }

        //버튼에 따른 할 일 
        const filteredTodos = store.state.todos.todoList.filter( todo => {
            if(store.state.filterType=='completed'){
                return todo.isCompleted==true;
            }
            if(store.state.filterType=='active'){
                return todo.isCompleted==false;
            }
            return todo;
        });

        this.element.innerHTML = `
        ${filteredTodos.map(todo=>{
            return `
            <li id='${todo._id}' class='${todo.isCompleted==true?'completed':''}'>
                <div class="view">
                    <input class="toggle" type="checkbox" ${todo.isCompleted==true?'checked':''}/>
                    <label class="label">
                    ${todo.priority == 'NONE'? 
                    `<select class="chip select">
                        <option value="0" selected>순위</option>
                        <option value="1">1순위</option>
                        <option value="2">2순위</option>
                    </select>`
                    :
                    ` <span class="chip ${todo.priority =='FIRST'? 'primary':'secondary'}">
                        ${todo.priority =='FIRST'? '1':'2'}순위
                      </span>`
                    }
                    ${todo.contents}
                    </label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="${todo.contents}" />
            </li>
            
            `
        }).join('')}
        `;
        
    }

    //이벤트 설정할 수 있게 해줌
    setEvent(target){
        target.addEventListener('click', e => {
            this.toDoClick(e);
        });
        target.addEventListener('dblclick', e => {
            this.toDoEdit(e);
        });
        target.addEventListener('keyup', e => {
            this.toDoKeyup(e);
        });
        target.addEventListener('click', e => {
            this.setPriority(e);
        })
    }

}
export default List;