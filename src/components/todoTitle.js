import {$userTitle} from '../todoDOM.js';

export const editTitleName = (name) => {
    clearTitle($userTitle);
    $userTitle.insertAdjacentHTML('afterbegin', titleTemplate(name));
}

const titleTemplate = (name) => {
    return `<span><strong>${name}</strong>'s Todo List</span>`
}

const clearTitle = ($parent) => {
    $parent.removeChild($parent.lastChild);
}