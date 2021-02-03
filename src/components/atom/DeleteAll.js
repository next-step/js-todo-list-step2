/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly';

function DeleteAll(props) {
  const { onDeleteAll } = props;
  return (
    <div title="kill em all" className="delete-all" onclick={onDeleteAll}>
      😈
    </div>
  );
}

export default DeleteAll;
