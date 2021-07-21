import Component from "../core/Component";
import { $, $$ } from "./utils.js";
import { Filter } from "./constants.js";

export default class TodoContainer extends Component {

  template() {
    const { itemCouunt } = this.$props;
    return `
       
        <span class="todo-count">총 <strong>${itemCount}</strong> 개</span>
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
        <button class="clear-completed">모두 삭제</button>
      `
  }
    
  setEvent() {
    const { onFilterTodo, onDeleteTodoList } = this.$props;
    $$("li a")
    this.addEvent("click", "li>a", ({ target }) => {
      
      Array.from($$("li>a")).forEach(item => item.classList.remove('selected'));
      target.classList.add('selected');
      const filter = Filter(target.className);
      onFilterTodo(filter)
    });
    
    this.addEvent("click", ".clear-completed", event => {
      onDeleteTodoList();
    })

    
  }
}