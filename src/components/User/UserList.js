import { registerEvent } from '../../event.js';
import { postUser } from '../../endpoint/api.js';
import { setter, getter } from '../../store/index.js';

const UserList = ({ }) => {
  const userId = getter.userId();

  const userCreate = () => {
    const $userCreateButton = document.querySelector('.user-create-button');
    $userCreateButton.addEventListener('click', onUserCreateHandler);
  };

  const onUserCreateHandler = async () => {
    const name = prompt('추가하고 싶은 이름을 입력해주세요.');
    if (!name) return;

    await validateUserName(name);

    try {
      await postUser({ name });
      await setter.userList();
    } catch (err) {
      console.log(err);
    }
  };

  const validateUserName = async (name) => {
    if (name.length > 1)
      return true;

    alert('User 의 이름은 최소 2글자 이상이어야 합니다.');
    await onUserCreateHandler();
  };



  registerEvent(userCreate);

  const userList = getter.userList();

  const btnStyle = (id) => userId === id ? 'active' : '';

  return `
    <section>
      <div id="user-list">
        ${ userList.map((user) => `<button data-index="${ user._id }" 
                                            class="ripple ${btnStyle(user._id)}">
                                            ${ user.name }
                                            </button>`).join('')
  }
        <button class="ripple user-create-button">+ 유저 생성</button>
      </div>
    </section>
    `; // ripple active
};

export default UserList;