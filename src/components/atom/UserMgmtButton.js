/*@jsx Reilly.createElement*/
import Reilly from 'reilly';

function UserMgmtButton({ type, onclick }) {
  return (
    <button className={`ripple user-${type}-button`} onclick={onclick}>
      유저 생성
    </button>
  );
}

export default UserMgmtButton;
