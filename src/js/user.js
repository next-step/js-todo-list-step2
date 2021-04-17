import {$, utils} from './util.js'
import {userStore} from './store.js'

const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}

const userCreateButton = $('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

export const user = () => {
  const addUser = () => {
    console.log('add user')
  }
  return { addUser }
}
