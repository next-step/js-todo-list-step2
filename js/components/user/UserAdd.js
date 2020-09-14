import {userApi} from "../../service/UserApi.js";

const onClickAddHandler = (user)=>{
    const userList =  userApi.getUserList().then(response => response);

}


export class UserAdd {

    constructor({$userAdd}) {

        this.$userAdd = $userAdd;
        this.$userAdd.addEventListener('click', () => {
            const user = window.prompt('유저를 입력하십시오.');
            if (user) {
                onClickAddHandler(user);
            }
        })


    }

}