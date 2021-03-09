/*@jsx Reilly.createElement*/
import Reilly from 'reilly';

function DeleteAll({ onDeleteAll }) {
  return (
    <button title="kill em all" className="delete-all" onclick={onDeleteAll}>
      😈
    </button>
  );
}

export default DeleteAll;
