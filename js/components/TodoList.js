import Component from '../core/Component.js';
import createTodoItem from '../templates/todoItem.js';

export default class TodoList extends Component {
  constructor($target, props) {
    super($target, props);
    this.props.activeUser.subscribe(this.render);
    this.initEventListener();
  }

  ontoggle = ($target) => {
    $target.classList.toggle('completed');
    setTimeout(() => this.props.completeTodo($target.dataset.key), 200);
  };

  initEventListener() {
    this.$target.addEventListener('click', ({ target }) => {
      const $li = target.closest('li');

      if (target.classList.contains('toggle')) this.ontoggle($li);
      else if (target.classList.contains('destroy'))
        this.props.deleteTodo($li.dataset.key);
    });
  }

  render = () => {
    const { todoList } = this.props.activeUser.value;

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
