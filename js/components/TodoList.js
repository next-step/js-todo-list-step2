import Component from '../core/Component.js';
import createTodoItem from '../templates/todoItem.js';

export default class TodoList extends Component {
  constructor($target, props) {
    super($target, props);
    this.props.activeUser.subscribe(this.render);
  }

  render = () => {
    const { todoList } = this.props.activeUser.value;
    console.log(todoList);

    this.$target.innerHTML = '';
    todoList.forEach(
      ({ contents, isCompleted, priority, _id }) =>
        (this.$target.innerHTML += createTodoItem(
          _id,
          contents,
          isCompleted,
          priority
        ))
    );
  };
}
