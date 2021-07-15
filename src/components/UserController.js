import { setUser } from '../api.js';

function UserController({userCreateHandler}) {
  const userCreateButton = document.querySelector('.user-create-button');
  // const userDeleteButton = document.querySelector('.user-delete-button');

  userCreateButton.addEventListener('click',userCreateHandler)
  // userDeleteButton.addEventListener('click',userDeleteHandler)
}




export default UserController;