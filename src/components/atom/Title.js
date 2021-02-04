/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { MESSAGES } from 'utility';

function Title(props) {
  const { id, user } = props;

  return (
    <h1 id={id}>
      <span>
        {user ? (
          <span>
            <strong>{user.name}</strong>'s Todo List
          </span>
        ) : (
          MESSAGES.WELCOME
        )}
      </span>
    </h1>
  );
}

export default Title;
