/*@jsx Reilly.createElement*/
import Reilly from '../../lib/reilly/Reilly';
import { Skeleton } from '../atom/Skeleton';

export class UserList extends Reilly.Component {
  render() {
    const {
      users,
      isUsersLoading,
      isUserLoaded,
      onSelectUser,
      onCreateUser,
      onDeleteUser,
    } = this.props;

    return (
      <section>
        <button className="ripple user-create-button" onclick={onCreateUser}>
          유저 생성
        </button>
        <button className="ripple user-delete-button" onclick={onDeleteUser}>
          유저 삭제
        </button>
        {isUsersLoading ? (
          <Skeleton />
        ) : (
          <ul id="user-list" className={isUserLoaded ? 'folded' : ''}>
            {users?.map(user => (
              <button className="ripple" onclick={onSelectUser} id={user._id}>
                {user.name}
              </button>
            )) || []}
          </ul>
        )}
      </section>
    );
  }
}
