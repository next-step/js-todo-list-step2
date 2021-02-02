export default function TodoCount($element, { filterTodo, deleteAllTodos }){

    const onFilterTodos = ({target}) => {
        if(target.nodeName === 'A' && target.dataset){
            const filterState = target.dataset.set ?? 'all';
            $element.querySelector('.selected').classList.remove('selected');
            $element.querySelector(`.${filterState}`).classList.add('selected');
            filterTodo(filterState);
        }
    }

    const onDeleteAllTodos = ({target}) => {
        if(target.classList.contains('clear-completed') && target.nodeName === 'BUTTON'){
            deleteAllTodos();
        }
    }

    this.bindEvents = () => {
        $element.addEventListener('click', onFilterTodos);
        $element.addEventListener('click', onDeleteAllTodos);
    }
    
    this.init = () => {
        this.bindEvents();
    }

    this.init();

    this.render = (count) => {
        $element.querySelector('span.todo-count').textContent = count;
    }

}