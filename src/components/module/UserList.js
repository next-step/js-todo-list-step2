/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { Skeleton, UserMgmtButton, UserButton } from 'components';

class UserList extends Reilly.Component {
  render() {
    const {
      users,
      isUsersLoading,
      isUserLoaded,
      onSelectUser,
      onCreateUser,
      onDeleteUser,
    } = this.props;

    if (!Array.isArray(users)) return <Skeleton />;

    return (
      <section>
        <UserMgmtButton type="create" onclick={onCreateUser} />
        <UserMgmtButton type="delete" onclick={onDeleteUser} />
        {isUsersLoading ? (
          <Skeleton />
        ) : (
          <ul id="user-list" className={isUserLoaded ? 'folded' : ''}>
            {users.map(user => (
              <UserButton user={user} onclick={onSelectUser} />
            ))}
          </ul>
        )}
      </section>
    );
  }
}

export default UserList;
