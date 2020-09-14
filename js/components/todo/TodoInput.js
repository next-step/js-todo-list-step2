const onInputHandler = (value) => {

}
export class TodoInput {

    constructor({$todoInput, $userList, onInputHandler}) {
        this.$todoInput = $todoInput;
        this.$userList = $userList;


        this.$todoInput.addEventListener('keyup' , e=>{
            if(e.key === 'Enter'){
                if( e.target.value.length < 2 ){
                    alert('이름은 두글자 이상이여야 합니다.');
                    return;
                }
                const users = this.$userList.querySelector('.ripple');
                if(!users){
                    alert('유저가 없습니다. 등록해주시기 바랍니다.');
                    return;
                }
                const selectedUser = this.$userList.querySelector('.ripple.active');
                if(!selectedUser){
                    alert('사용자를 입력해주세요.')
                    return;
                }
                if(e.target.value){
                    onInputHandler(e.target.value);
                }
                e.target.value  = '';
            }

        })
        this.$todoInput.addEventListener('click' , e => {
            e.target.value = '';
        })

    }

}