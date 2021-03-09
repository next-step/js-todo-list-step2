/*@jsx Reilly.createElement*/
import Reilly from 'reilly';

function UserMgmtButton({ type, onclick }) {
  return (
    <button className={`ripple user-${type}-button`} onclick={onclick}>
      {type === 'create' ? '유저 생성' : '유저 삭제'}
    </button>
  );
}

export default UserMgmtButton;
