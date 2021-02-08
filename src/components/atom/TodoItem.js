/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { PRIORITY_CLASS, PRIORITY_ENUM } from 'utils';
import cn from 'classNames';

function TodoItem(props) {
  const {
    todo: { _id, isCompleted, contents, priority },
    editingId,
    onToggle,
    onDelete,
    onSetPriority,
    onStartEdit,
    onConfirmEdit,
  } = props;

  return (
    <li
      id={_id}
      className={cn({ completed: isCompleted, editing: _id === editingId })}
    >
      <div className="view">
        <input
          type="checkbox"
          className={cn('toggle', { checked: isCompleted })}
          checked={isCompleted}
          onclick={onToggle}
        />
        <label className="label" ondblclick={onStartEdit}>
          <select
            className={cn('chip', 'select', PRIORITY_CLASS.get(priority))}
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
        <button className="destroy" onclick={onDelete} />
      </div>
      <input className="edit" value={contents} onkeyup={onConfirmEdit} />
    </li>
  );
}

const optionConfig = (value, priority) => {
  let option = { value };
  if (value === PRIORITY_ENUM.get(priority)) option.selected = '';
  return option;
};

export default TodoItem;
