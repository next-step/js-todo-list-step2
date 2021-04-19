import $USER_DOM from '../util/constants.js';
const $buttons = document.querySelectorAll('.ripple');

const clickButton = (userButton) => {
    userButton.addEventListener('click', () => {buttonClicked(userButton)});
}

const buttonClicked = (userButton) => {
    initButton(userButton)
    selectButton(userButton);
}

const initButton = (userButton) =>  {
    Array.from($USER_DOM.list().children).filter(data => data.id != userButton.id)
        .map(data => data.classList.remove('active'));
}

const selectButton = (userButton) => {
    Array.from($USER_DOM.list().children).filter(data => data.id == userButton.id)
        .map(data => data.classList.add('active'));
}

export {clickButton, buttonClicked}


