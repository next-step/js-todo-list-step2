
const userStore = () => {
  const getUser = () => {
    console.log('get user')
  }
  return {getUser}
}

export {userStore}