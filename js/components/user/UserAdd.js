export class UserAdd {

    constructor({$userAdd, onClickAddHandler}) {

        this.$userAdd = $userAdd;
        this.$userAdd.addEventListener('click', () => {
            const user = window.prompt('유저를 입력하십시오.');
            if (user) {
                onClickAddHandler(user);
            }
        })


    }

}