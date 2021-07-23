import Component from "../core/Component";
import { $, $$, checkLength } from "./utils.js";

export default class TodoInput extends Component{
    template() {
        return `
        
        <input
          class="new-todo"
          placeholder="할 일을 입력해주세요."
          autofocus
        />
      `
    }
    setEvent() {
        const { onAddTodo } = this.$props;
        this.addEvent('keyup', '.new-todo', ({ target, key }) => {
            if (key !== 'Enter') return;
            const contents = target.value.trim();
            checkLength(contents);
            onAddTodo(contents);
        })
    }
}