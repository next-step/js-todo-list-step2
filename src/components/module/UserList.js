/*@jsx Reilly.createElement*/
import Reilly from 'reilly';
import { Skeleton, UserMgmtButton, UserButton } from 'components';
import { store } from '../..';
import { Interactions } from 'utils';
import { USERLIST as FOLDED } from '../../utils/constants';
import {
  fetchUserAsync,
  createUserAsync,
  deleteUserAsync,
} from '../../reducs/module/user';
import { useSelector } from '../../lib/reducs';

function UserList() {
  const { users, isUsersLoading, user } = useSelector(state => state.user);

  const onCreateUser = async () => {
    const name = Interactions.askName();
    if (!name) return;

    store.dispatch(createUserAsync(name));
  };

  const onDeleteUser = async () => {
    const { _id, name } = user;

    if (!Interactions.confirmDelete(name)) return;

    if (!_id) {
      Interactions.noUserToDelete();
      return;
    }

    store.dispatch(deleteUserAsync(_id));
  };

  const onSelectUser = e => store.dispatch(fetchUserAsync(e.target.id));

  if (!Array.isArray(users)) return <Skeleton />;

  return (
    <section>
      <UserMgmtButton type="create" onclick={onCreateUser} />
      <UserMgmtButton type="delete" onclick={onDeleteUser} />
      {isUsersLoading ? (
        <Skeleton />
      ) : (
        <ul id="user-list" className={user ? FOLDED.FOLD : FOLDED.UNFOLD}>
          {users?.map(user => (
            <UserButton user={user} onclick={onSelectUser} />
          ))}
        </ul>
      )}
    </section>
  );
}

export default UserList;
