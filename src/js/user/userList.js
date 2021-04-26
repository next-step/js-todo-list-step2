import {$USER_DOM, $TODO_DOM} from '../util/constants.js';
import $api from '../api.js';
import todoApp from '../todo/initTodoClass.js';

let seletedButton;
const $user_createButton = document.querySelector('.user-create-button');

const userList = (() => {
    const init = async () => {
        const users = await $api.user.getAll();
        users.map(element => drawButtons(element));
        setSelected(users[0]);
    }
    
    const drawTitle = (title) => {
        $USER_DOM.title().innerHTML = 
        `<h1 id="user-title" data-username="${title}">
            <span><strong>${title}</strong>'s Todo List</span>
        </h1>`;
    }

    const drawButtons = (element) => {
        const userButton = document.createElement('button');
        userButton.setAttribute('id', element._id);
        userButton.setAttribute('class', 'ripple');
        userButton.innerHTML = `${element.name}`;
        clickButton(userButton);
        $user_createButton.insertAdjacentElement('beforebegin', userButton);
        userButton.insertAdjacentHTML('beforebegin', ' ');
    }

    const deleteButtons = (_id) => {
        const button = document.getElementById(_id);
        $USER_DOM.list().removeChild(button);
    }

    const setSelected = (selected) => {
        selected.id = selected._id;
        seletedButton = selected
        buttonClicked(selected);
    }

    const reSelected = (selected) => {
        seletedButton = selected
        buttonClicked(selected);
    }

    const getSelected = () => {
        return seletedButton;
    };

    const setSelectedButton = async (userButton) => {
        seletedButton._id = userButton.id;
        await todoApp.allList(userButton.id);
        if(userButton.name != "") {
            seletedButton.name = userButton.name;
            drawTitle(seletedButton.name);
            return;
        }
        seletedButton.name = userButton.innerText;
        drawTitle(seletedButton.name);
    }

    const add = async (userName) => {
        
        const newUser = {
            name : userName
        }
        await $api.user.addUser(newUser);
        drawButtons(newUser);
    }

    const del = async (isDel, _id) => {
        if (isDel) {
            deleteButtons(_id);
            await $api.user.deleteUser(_id);
        }
        reSelected($USER_DOM.list().querySelector('.ripple'));
    }

    const clickButton = (userButton) => {
        todoApp.loadById(userButton.id);
        userButton.addEventListener('click', () => {buttonClicked(userButton)});
    }
    
    const buttonClicked = (userButton) => {
        initButton(userButton);
        selectButton(userButton);
    }
    
    const initButton = (userButton) =>  {
        Array.from($USER_DOM.list().children).filter(data => data.id != userButton.id)
            .map(data => data.classList.remove('active'));
    }
    
    const selectButton = (userButton) => {
        userList.setSelectedButton(userButton);
        Array.from($USER_DOM.list().children).filter(data => data.id == userButton.id)
            .map(data => data.classList.add('active'));
    }

    

    return {
        init,
        add,
        del,
        setSelectedButton,
        getSelected
    };

})();

export default userList