import { store } from '../modules/index.js'

const getFirstUser = (userList) => {
  if (!userList) {
    const { users } = store.getState()
    return users[0]
  }
  return userList[0]
}

const getActiveUserId = () => {
  const { seletedUser } = store.getState()

  return seletedUser?._id
}

export { getActiveUserId, getFirstUser }
