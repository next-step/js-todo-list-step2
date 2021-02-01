import Reilly, { createElement } from '../lib/reilly/Reilly.js';
import { PRIORITY_CLASS, PRIORITY_ENUM } from '../types/constants.js';

class TodoItem extends Reilly.Component {
  render() {
    const {
      todo: { _id, isCompleted, contents, priority },
      editingId,
      onSetPriority,
    } = this.props;

    return createElement(
      'li',
      {
        id: _id,
        className: `${isCompleted ? 'completed' : ''} ${
          _id === editingId ? 'editing' : ''
        }`,
      },
      createElement(
        'div',
        { className: 'view' },
        createElement('input', {
          type: 'checkbox',
          className: `toggle ${isCompleted ? 'checked' : ''}`,
          checked: isCompleted,
        }),

        createElement(
          'label',
          { className: 'label' },
          createElement(
            'select',
            {
              className: `chip select ${PRIORITY_CLASS.get(priority)}`,
              onchange: onSetPriority,
            },
            ...[0, 1, 2].map(value =>
              createElement(
                'option',
                optionConfig(value, priority),
                (value === 0 ? '' : value) + '순위'
              )
            )
          ),
          contents
        ),
        createElement('button', { className: 'destroy' })
      ),
      createElement('input', {
        className: 'edit',
        value: contents,
      })
    );
  }
}

const optionConfig = (value, priority) => {
  let res = { value };
  if (value === PRIORITY_ENUM.get(priority)) res.selected = '';
  return res;
};

export default TodoItem;
