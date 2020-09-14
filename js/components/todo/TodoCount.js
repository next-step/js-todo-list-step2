import {userApi} from '../../service/UserApi.js'


const template = (completeCounter, todoCounter) => {

    return `
        <span id="todo-count" class="todo-count>
            총 <span class="count"><strong>${todoCounter}</strong></span> 개 중
        </span>        
        <span id="completed-count" class="todo-count">
                <span class="count">${completeCounter}</span> 개 완료
        </span>
             <ul class="filters">
                <li>
                    <a href="#" class="all selected">전체보기</a>
                </li>
                <li>
                    <a href="#active" class="active">해야할 일</a>
                </li>
                <li>
                    <a href="#completed" class="completed">완료한 일</a>
                </li>
            </ul>
        <button class="clear-all">모두 삭제</button>
    `;
}

export class TodoCount {
    constructor({
                    $todoCounter, username,
                    onRemoveAllHandler

                }) {
        this.$todoCounter = $todoCounter;
        this.username = username;

        this.$todoCounter.addEventListener('click', (e) => {
            if (e.target.className === 'clear-all') {
                onRemoveAllHandler();
            }
            if( e.target.className === 'all selected'){
                console.log('all seletec');
            }
            if(e.target.className === 'active'){
                console.log('active');
            }
            if(e.target.className === 'completed'){
                console.log('completed');
            }
        })
        this.render();
    }

    setState(selectUsername) {
        this.username = selectUsername;
        this.render();
    }

    async render() {
        if (this.username) {
            const apiResponse = await userApi.getUserTodoItem(this.username);
            const responseArray = apiResponse.then(response => {
                return response;
            });
            const completedTodoArray = responseArray.filter(
                todo => todo.isCompleted === true
            );
            this.$todoCounter.innerHTML = template(completedTodoArray.length, responseArray.length);

        }
    }
}