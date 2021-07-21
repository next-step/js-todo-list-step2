import Component from "../core/Component";
import { $, $$, checkLength } from "../utils.js";
import { PRIORITY } from "./constants";

export default class TodoList extends Component {
    template() {
        const { todoList } = this.$props;
      return `
      <ul class="to do-list">
    ${todoList.map(({ _id, contents, isCompleted, priority }) => `
        <li class=${isCompleted ? "completed" : ''} data-id=${_id}>
          <div class="view">
            <input class="toggle" type="checkbox" ${isComplete ? "checked" : ''} }/>
            <label class="label">
            ${priority === 'NONE' ? `
              <select class="chip select">
                <option value="0" selected}>순위</option>
                <option value="1">1순위</option>
                <option value="2">2순위</option>
              </select>`: `<span class="chip ${priorirty === 'FIRST' ? 'primary' : 'secondary'}">
              ${priority === 'FIRST' ? '1순위' : '2순위'}</span>`}
              ${contents}
            </label>
            <button class="destroy"></button>
          </div>
          <input class="edit" value="${content}" />
        </li>
      `).join('')}
      </ul>`
      
        
        
    }
    setEvent() {
        const {  onDeleteTodo, onSetPriorityTodo, onToggleTodo, onUpdateTodo } = this.$props;
        
        this.addEvent("click", ".destroy", ({ target }) => {
            const itemid = target.closest("li").dataset.id;
             onDeleteTodo(itemid);
        });
        this.addEvent("change", ".chip", ({ target }) => {
            const itemid = target.closest('li').dataset.id;
           onSetPriorityTodo(itemid, PRIORITY[target.value]);
        });
        this.addEvent("dblclick", ".label", (event) => {
            event.target.closest(`[data-id]`).classList.add("editing");
        });
        this.addEvent("keyup", ".edit", ({ key, target }) => {
            const itemid = target.closest('li').dataset.id;
            const content = target.value.trim();
            if (key === 'Escape') target.closest('[data-id]').classList.remove('editing');
            else if (key === 'Enter') {
                checkLength(content);
                onUpdateTodo(itemid, content);
            }
        });
        this.addEvent("input", ".toggle", ({ target }) => {
            const itemid = target.closest('li').dataset.id;
            onToggleTodo(itemid);
        });
    
    }
}