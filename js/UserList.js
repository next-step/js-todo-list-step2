import { getUser } from './httpRequest.js';

const $userList = document.querySelector('#user-list');

const getUserList = async () => {
    try{
        const userList = await getUser();
        console.log(userList);

        const userListTemplate = userList.map(({_id, name}) => `
            <button data-id=${_id} class="ripple">${name}</button>
        `).join('');

        $userList.innerHTML = userListTemplate;
    } catch(e){
        console.error(e);
    }
};

getUserList();