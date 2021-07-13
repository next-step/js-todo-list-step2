export default class UserList {
  constructor({ $target }) {
    const section = document.createElement('section');

    const userList = document.createElement('div');
    userList.id = 'user-list';

    const btnMakerjun = document.createElement('button');
    btnMakerjun.className = 'ripple active';
    btnMakerjun.innerText = 'makejun';

    const btnEastjun = document.createElement('button');
    btnEastjun.className = 'ripple';
    btnEastjun.innerText = 'eastjun';

    const btnCreateUser = document.createElement('button');
    btnCreateUser.className = 'ripple user-create-button';
    btnCreateUser.dataset.action = 'createUser';
    btnCreateUser.innerText = '+ 유저 생성';

    const btnDeleteUser = document.createElement('button');
    btnDeleteUser.className = 'ripple user-delete-button';
    btnDeleteUser.dataset.action = 'deleteUser';
    btnDeleteUser.innerText = '삭제 -';

    userList.appendChild(btnMakerjun);
    userList.appendChild(btnEastjun);
    userList.appendChild(btnCreateUser);
    userList.appendChild(btnDeleteUser);
    section.appendChild(userList);
    $target.appendChild(section);
  }
}
