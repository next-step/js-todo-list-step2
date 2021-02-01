import Reilly, { createElement } from '../lib/reilly/Reilly.js';
import FilterList from './FilterList.js';

class CountContainer extends Reilly.Component {
  render() {
    const { mode, todoList, onModeChange, onDeleteAll } = this.props;

    return createElement(
      'div',
      { className: 'count-container' },
      createElement(
        'span',
        { className: 'todo-count' },
        '총 ',
        createElement('strong', null, todoList.length),
        ' 개'
      ),
      createElement(FilterList, { mode, onModeChange }),
      createElement(
        'div',
        { title: `kill em all`, className: 'delete-all', onclick: onDeleteAll },
        '😈'
      )
    );
  }
}

export default CountContainer;
