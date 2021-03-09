/*@jsx Reilly.createElement*/
import Reilly from 'reilly';

function UserButton({ user, onclick }) {
  return (
    <button className="ripple" onclick={onclick} id={user._id}>
      {user.name}
    </button>
  );
}

export default UserButton;
