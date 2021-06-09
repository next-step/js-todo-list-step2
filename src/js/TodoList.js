import todoItemTemplate from './todoItemTemplate.js';

export default function TodoList({ onToggle, onDelete, onEdit, onDeleteAll }) {
  this.$todoList = document.querySelector(".todo-list"); 
  this.$deleteAllBtn = document.querySelector(".clear-completed"); 

  const EventHandler = (event) => {
    return {
      $li: event.target.closest('li'),
      id: event.target.closest('li').getAttribute('id'),
    } 
  }

  this.setState = (updatedTodoItems) => {
    const todoItems = updatedTodoItems;
    this.render(todoItems);
  }

  this.render = (items) => {  
    const htmlItems = items.map(todoItemTemplate).join('');
    this.$todoList.innerHTML = htmlItems;
  };

  this.toggleTodoItem = (event) => {
    if (!event.target.matches('.toggle')) return;
    const {id} = EventHandler(event); 
    onToggle(id);
  }

  this.deleteTodoItem = (event) => {
    if (!event.target.matches('.destroy')) return;
    const {id} = EventHandler(event); 
    onDelete(id);
  }

  this.deleteAllTodo = () => {
    console.log(3333333333);
    onDeleteAll();
  }

  this.activeEdit = (event) => {
    if (!event.target.matches('label')) return;
    const {$li} = EventHandler(event); 
    $li.classList.add("editing");
  }

  this.endEdit = (event) => {
    if (!event.target.matches('.edit')) return;
    const label = event.target.previousElementSibling.children[1];
    const {$li,id} = EventHandler(event) 

    if (event.key === 'Escape') {
      onEdit(id, label.textContent);
      $li.classList.remove('editing');  
    }

    if (event.key === 'Enter') {
      onEdit(id, event.target.value.trim());
    }
  }

  this.$todoList.addEventListener('click', event => this.toggleTodoItem(event));
  this.$todoList.addEventListener('click', event => this.deleteTodoItem(event));
  this.$todoList.addEventListener('dblclick', event => this.activeEdit(event));
  this.$todoList.addEventListener('keyup', event => this.endEdit(event));
  this.$deleteAllBtn.addEventListener('click', () => this.deleteAllTodo());

} 