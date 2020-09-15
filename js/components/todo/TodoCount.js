import {userApi} from '../../service/UserApi.js'
import {Component} from "../../core/Component.js";


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

export class TodoCount extends Component{
    constructor($target ,  event , props) {
        super($target ,  event , props)

    }

}