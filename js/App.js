import TodoList from './TodoList.js';

export default class App {
  constructor({ data, $targetTodoInput, $targetTodoList }) {
    this.data = data;
    this.$targetTodoInput = $targetTodoInput;
    this.$targetTodoList = $targetTodoList;

    this.todoList = new TodoList({
      data,
      $targetTodoList
    });

  }

  setState(nextData){
    this.data = nextData 
  }

  render(){

  }
}
