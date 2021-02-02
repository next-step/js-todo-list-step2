/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly.js';
import { PRIORITY_CLASS, PRIORITY_ENUM } from '../../types/constants.js';

class TodoItem extends Reilly.Component {
  render() {
    const {
      todo: { _id, isCompleted, contents, priority },
      editingId,
      onSetPriority,
    } = this.props;

    return (
      <li
        id={_id}
        className={`${isCompleted ? 'completed' : ''} ${
          _id === editingId ? 'editing' : ''
        }`}
      >
        <div className="view">
          <input
            type="checkbox"
            className={`toggle ${isCompleted ? 'checked' : ''}`}
            checked={isCompleted}
          />
          <label className="label">
            <select
              className={`chip select ${PRIORITY_CLASS.get(priority)}`}
              onchange={onSetPriority}
            >
              <option {...optionConfig(0, priority)}>순위</option>
              <option {...optionConfig(1, priority)}>1순위</option>
              <option {...optionConfig(2, priority)}>2순위</option>
            </select>
            {contents}
          </label>
          <button className="destroy" />
        </div>
        <input className="edit" value={contents} />
      </li>
    );
  }
}

const optionConfig = (value, priority) => {
  let option = { value };
  if (value === PRIORITY_ENUM.get(priority)) option.selected = '';
  return option;
};

export default TodoItem;
