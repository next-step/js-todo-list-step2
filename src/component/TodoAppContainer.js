import Todocount from './Todocount.js';
import Todoinput from './Todoinput.js';
import Todolist from './Todolist.js';

class TodoAppContainer {
  constructor({ $app, initState }) {
    this.state = initState;
    const $todoapp = document.createElement('section');
    this.$todoapp = $todoapp;
    this.$todoapp.className = 'todoapp';
    $app.appendChild(this.$todoapp);

    new Todoinput({
      $todoapp,
    });

    this.Todolist = new Todolist({
      $todoapp,
      initState: {
        todoList: this.state.todoList,
        isLoading: false,
      },
    });
    this.Todocount = new Todocount({
      $todoapp,
    });
  }

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.Todolist.setState({
      todoList: this.state.todoList,
      isLoading: false,
    });
  }
}

export default TodoAppContainer;
