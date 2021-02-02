/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly.js';

export function DeleteAll(props) {
  const { onDeleteAll } = props;
  return (
    <div title="kill em all" className="delete-all" onclick={onDeleteAll}>
      😈
    </div>
  );
}
