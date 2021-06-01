import TodoHeader from './components/todoHeader.js';
import { GET_USER_LIST } from './constant/constant.js';

class App {
  constructor($target, dataController) {
    console.log("createApp");
    // const defaultState = localStorage.getItem('myState');
    // // Nullish coalescing operator
    // this.state = JSON.parse(defaultState) ?? { todos: [], selected: ALL };
    this.$target = $target;
    this.dataController = dataController;
    // header
    // this.header = new TodoHeader(this.$target, );

    // // todoinput
    // this.todoInput = new TodoInput(
    //   document.querySelector('.new-todo'),
    //   this.onKeyDown
    // );

    // // todolist
    // this.todoList = new TodoList(document.querySelector('.todo-list'), {
    //   state: this.state,
    //   onDeleteItem: this.onDeleteItem,
    //   changeTodoState: this.changeTodoState,
    //   changeTodoValue: this.changeTodoValue,
    // });

    // // todoCount
    // this.todoCount = new TodoCount(document.querySelector('.count-container'), {
    //   state: this.state,
    //   changeSelected: this.changeSelected,
    // });
  }

  // onKeyDown = (value) => {
  //   const newTodoItems = {
  //     ...this.state,
  //     todos: [...this.state.todos, { value, state: VIEW }],
  //   };
  //   this.setState(newTodoItems);
  // };
  // onDeleteItem = (index) => {
  //   const newTodoItems = this.state.todos;
  //   newTodoItems.splice(index, 1);
  //   const newState = { ...this.state, todos: newTodoItems };
  //   this.setState(newState);
  // };

  // changeTodoState = (index, state) => {
  //   const newTodos = [...this.state.todos];
  //   newTodos[index].state = state;
  //   const newState = { ...this.state, todos: newTodos };
  //   this.setState(newState);
  // };

  // changeTodoValue = (index, value) => {
  //   const newTodos = [...this.state.todos];
  //   newTodos[index].value = value;
  //   const newState = { ...this.state, todos: newTodos };
  //   this.setState(newState);
  // };

  // changeSelected = (name) => {
  //   const newState = { ...this.state, selected: name };
  //   this.setState(newState);
  // };
  // // NOTE onKeyPress(value) {}는 동작하지 않습니다.
  // // 왜 안되는지 this에 대해서 다시 공부해봅시다.
  // setState = (nextState) => {
  //   this.state = nextState;
  //   localStorage.setItem('myState', JSON.stringify(this.state));
  //   this.todoList.setState(this.state);
  //   this.todoCount.setState(this.state);
  // };
}

export default App;