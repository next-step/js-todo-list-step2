import Component from '../core/Component.js';
import createTodoItem from '../templates/todoItem.js';
import createLoadingBar from '../templates/loadingBar.js';

export default class TodoList extends Component {
  constructor($target, props) {
    super($target, props);
    this.props.todoList.subscribe(this.render);
    this.initEventListener();
    this.render();
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
    this.$target.addEventListener('dblclick', ({ target }) => {
      if (target.classList.contains('label')) {
        const $li = target.closest('li');
        $li.classList.add('editing');
      }
    });
    this.$target.addEventListener('keyup', ({ target, key }) => {
      const $li = target.closest('li');
      if (key === 'Enter' && $li.classList.contains('editing')) {
        this.props.editTodo($li.dataset.key, target.value);
      }
    });
  }

  render = () => {
    if (!!this.props.todoList.value) {
      const todoList = this.props.todoList.value;

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
    } else {
      this.$target.innerHTML = createLoadingBar();
    }
  };
}
