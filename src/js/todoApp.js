import { userComponent } from './user.js'
let user, userList;
const todoApp = () => {
  const init = () => {
    userComponent().userInit()
  }
  return {init}
}

export {todoApp};
