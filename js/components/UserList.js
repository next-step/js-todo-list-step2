import Reilly, { createElement } from '../lib/reilly/Reilly.js';
import { Skeleton } from './Skeleton.js';

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

    return createElement(
      'section',
      null,
      createElement(
        'button',
        {
          className: 'ripple user-create-button',
          onclick: onCreateUser,
        },
        '유저 생성'
      ),
      isUsersLoading
        ? createElement(Skeleton)
        : createElement(
            'ul',
            {
              id: 'user-list',
              className: isUserLoaded ? 'folded' : '',
            },
            ...(users?.map(user =>
              createElement(
                'button',
                {
                  className: 'ripple',
                  onclick: onSelectUser,
                  oncontextmenu: onDeleteUser,
                  id: user._id,
                },
                user.name
              )
            ) || [])
          )
    );
  }
}
