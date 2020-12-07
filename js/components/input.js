import Component from '../lib/component.js';
import store from '../store/index.js';

const Input = class extends Component {
    constructor() {
        super({
            store,
            element : document.querySelector(".new-todo")
        });
    }
    
    addToDo = (e) => {
        //엔터 키에만 수행
        const toDos = store.state.todos.todoList;
        if(e.key !== "Enter" || e.target.value.replace(/(\s*)/g, "")==""){
            return;
        }
        const text = e.target.value;
        store.dispatch('addToDo', {"contents":text});
        //입력시엔 할 일들을 보두 보여줌
        store.dispatch('setFilterType', 'all');
        e.target.value = '';
        e.target.focus();
    }

    setEvent(target){
        target.addEventListener('keyup', e => {
            this.addToDo(e);
        });
    }
}
export default Input;
