import api from './api.js';

//USER 추가하기
const createUser = async ({ setState }) => {
  const name = prompt('추가하고 싶은 이름을 입력해주세요.');
  if (!name) return;
  if (name && name.length < 2) {
    return alert('이름은 2글자 이상이어야 합니다!');
  }
  const response = await api.addUser(name);
  if (response.isError) {
    return null;
  }
  const userList = await getUsersList();

  setState({
    userList,
  });
};

//USER 삭제하기
const deleteUser = async ({ setState, activeUserInfo }) => {
  const { _id, name } = activeUserInfo;
  const result = confirm(`정말 ${name}을 삭제하시겠습니까?`);
  if (!result) return;
  setState({
    isLoading: true,
  });

  const response = await api.deleteUser(_id);
  if (response.isError) {
    return null;
  }
  const userList = await getUsersList();
  const newUserInfo = userList[0];
  setState({
    userList,
    activeUserInfo: newUserInfo,
    activeName: newUserInfo.name,
    isLoading: false,
  });
};

//USER 불러오기
const selectUser = () => {
  console.log('selectUser');
};

//USER list 불러오기
const getUsersList = async () => {
  const response = await api.getUsersList();

  if (!response.isError) {
    const userList = response.data;
    return userList;
  } else {
    //에러처리
  }
};

export { createUser, deleteUser, selectUser };
