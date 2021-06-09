export default function TodoFilter({onRenderAll, onActive, onCompleted}) {
  this.todoFilters = document.querySelector('.filters');

  this.allTodo = (event) => {
    if (!event.target.matches('.all')) return;
    console.log(111);
    onRenderAll();
  } 

  this.active = (event) => {
    if (!event.target.matches('.active')) return;
    console.log(5);
    onActive();
  }
  
  this.completed = (event) => {
    if (!event.target.matches('.completed')) return;
    console.log(33);
    onCompleted();
  }

  this.todoFilters.addEventListener('click', event => this.allTodo(event));
  this.todoFilters.addEventListener('click', event => this.active(event));
  this.todoFilters.addEventListener('click', event => this.completed(event));
}