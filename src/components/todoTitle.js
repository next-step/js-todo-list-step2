import {$userTitle} from '../todoDOM.js';
import {template} from '../template.js';


export const editTitleName = (name) => {
    clearTitle($userTitle);

    $userTitle.setAttribute('data-username', name);
    $userTitle.insertAdjacentHTML('afterbegin', template.title(name));
}

const clearTitle = ($parent) => {
    if($parent.firstChild){
        $parent.removeChild($parent.lastChild);
    }
}
