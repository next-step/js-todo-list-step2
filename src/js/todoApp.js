import { userComponent } from './user.js'

const todoApp = () => {
  const init = () => {
    userComponent().userInit()
  }
  return {init}
}

export {todoApp};
