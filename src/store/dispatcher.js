export const getUsers = (userList) => {
  return {
    type: GET_USERS,
    payload: {
      userList,
    },
  };
};
