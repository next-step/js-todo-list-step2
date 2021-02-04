/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { PRIORITY_CLASS, PRIORITY_ENUM } from 'utility';

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
              {[0, 1, 2].map((_, count) => (
                <option {...optionConfig(count, priority)}>
                  {count && count}순위
                </option>
              ))}
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
