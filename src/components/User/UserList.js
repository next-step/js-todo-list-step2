import { registerEvent } from '../../event.js';
import { postUser } from '../../endpoint/api.js';

const UserList = ({ users }) => {

  const onUserCreateHandler = async () => {
    const name = prompt('추가하고 싶은 이름을 입력해주세요.');

    await validateUserName(name);

    try {
      await postUser({ name });
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

  const userCreate = () => {
    const $userCreateButton = document.querySelector('.user-create-button');
    $userCreateButton.addEventListener('click', onUserCreateHandler);
  };

  registerEvent(userCreate);

  return `
    <section>
      <div id="user-list">
        <button class="ripple active">eastjun</button>
        <button class="ripple">hojun</button>
        <button class="ripple user-create-button">+ 유저 생성</button>
      </div>
    </section>
    `;
};

export default UserList;