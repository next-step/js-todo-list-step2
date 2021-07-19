import { $ } from '../utils/selectors.js';

function UserController({userCreateHandler,userDeleteHandler}) {
  const userCreateButton = $('.user-create-button');
  const userDeleteButton = $('.user-delete-button');

  userCreateButton.addEventListener('click',userCreateHandler)
  userDeleteButton.addEventListener('click',userDeleteHandler)
}




export default UserController;