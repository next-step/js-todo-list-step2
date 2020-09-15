
import {Component} from "../../core/Component.js";


const template = (userName, userList) => {

    userList.map(
        (user) =>
            `<button class="${
                user.name === userName ? 'ripple active' : 'ripple'
            }">${user.name}</button>`
    ).join('');
}
const loadingTemplate = () => `
    <li>
        <div class="view">
        <label class="label">
            <div class="animated-background">
                 <div class="skel-mask-container">
                    <div class="skel-mask"></div>
                 </div>
            </div>
            </label>
        </div>
    </li>    
    `
const createUserTemplate = () => `
    <button class="user-create-button">유저 생성</button>
`
const deleteUserTemplate = () => `
    <button class="user-delete-button">유저 삭제</button>
`

export class UserList extends Component{


    constructor($target , event ,  props) {
        super($target , event ,  props);
    }

}