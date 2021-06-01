const getUsers = (users) => {
  return {
    type: GETUSERS,
    payload: {
      users,
    },
  }
}

const getUser = (user) => {
  return {
    type: GETUSER,
    payload: {
      user,
    },
  }
}

const deleteUser = (userId) => {
  return {
    type: DELETEUSER,
    payload: {
      userId,
    },
  }
}

const createUser = (user) => {
  return {
    type: CREATEUSER,
    payload: {
      user,
    },
  }
}

export { getUsers, getUser, deleteUser, createUser }
