import {$, utils} from './util.js'
import {userStore} from './store.js'
import {Message as msg} from './constant.js'

const onUserCreateHandler = () => {
  const userName = prompt(msg.INPUT_USER_NAME_FOR_ADD);
  if(!utils.isValid2MoreWord(userName)) {
    alert(msg.MUST_2_MORE_WORD)
    return
  }
  user().addUser(userName);

}

const userCreateButton = $('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

export const user = () => {
  const addUser = (userName) => {
    console.log('add user')
    let rst = userStore().addUser(userName);
    rst.then(result=>{
      console.log('rst=',result.name)
    })
  }
  return { addUser }
}
