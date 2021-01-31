import {$userTitle} from '../todoDOM.js';


export const editTitleName = (name) => {
    clearTitle($userTitle);

    $userTitle.setAttribute('data-username', name);
    $userTitle.insertAdjacentHTML('afterbegin', titleTemplate(name));
}

const titleTemplate = (name) => {
    return `<span><strong>${name}</strong>'s Todo List</span>`
}

const clearTitle = ($parent) => {
    if($parent.firstChild){
        $parent.removeChild($parent.lastChild);
    }
}
