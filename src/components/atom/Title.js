/*@jsx Reilly.createElement*/
import Reilly from 'reilly';

function Title(props) {
  const { id, user } = props;

  return (
    <h1 id={id}>
      <span>
        {user && <strong>{user.name}</strong>}
        {user && "'s Todo List "}
        {!user && 'Todo List'}
      </span>
    </h1>
  );
}

export default Title;
