export default function TodoFilter({onRenderAll, onActive, onCompleted}) {
  this.todoFilters = document.querySelector('.filters');

  this.allTodo = (event) => {
    if (!event.target.matches('.all')) return;
    onRenderAll();
  } 

  this.active = (event) => {
    if (!event.target.matches('.active')) return;
    onActive();
  }
  
  this.completed = (event) => {
    if (!event.target.matches('.completed')) return;
    onCompleted();
  }

  this.todoFilters.addEventListener('click', event => this.allTodo(event));
  this.todoFilters.addEventListener('click', event => this.active(event));
  this.todoFilters.addEventListener('click', event => this.completed(event));
}