const ContentWrapper = ({ _id, contents, isCompleted }) => {
  const checked = isCompleted ? 'checked' : '';
  return `<div class="view">
      <input class="toggle" type="checkbox" name="${_id}" ${checked}/>
      <label for="${_id}">${contents}</label>
      <button class="delete" name="${_id}"></button>
    </div>`;
};

const EditInput = ({ _id, content }) => {
  return `<input class="edit" name="${_id}" value="${content}" autofocus/>`;
};

const Item = props => {
  const { _id, isCompleted, editing } = props;
  const completed = isCompleted ? 'completed' : '';
  const edit = editing ? 'editing' : '';
  return `<li id=${_id} class="${completed} ${edit}">
      ${ContentWrapper(props)}${EditInput(props)}
    </li>`;
};

export default class TodoList {
  constructor({ $element, todoItems, onToggleItem }) {
    this.$element = $element;
    this.todoItems = todoItems;

    // 마우스 클릭 이벤트
    this.$element.addEventListener('click', e => {
      // 아이템 완료/미완료 선택
      if (e.target.nodeName === 'INPUT' && e.target.className === 'toggle') {
        const id = e.target.name;

        // 체크 애니메이션을 위해서 html 원소 직접 접근
        const $targetLi = document.querySelector(`li[id=${id}]`);
        const $targetInput = document.querySelector(`input[name="${id}"]`);
        if ($targetInput.hasAttribute('checked')) {
          $targetLi.classList.remove('completed');
          $targetInput.removeAttribute('checked');
        } else {
          $targetLi.classList.add('completed');
          $targetInput.setAttribute('checked', '');
        }

        onToggleItem(id);
        return;
      }

      // 아이템 삭제
      // if (e.target.nodeName === 'BUTTON' && e.target.className === 'destroy') {
      //   onClickDestroy(e.target.name);
      //   return;
      // }
    });

    this.render();
  }

  render() {
    this.$element.innerHTML = `${this.todoItems.map(item => Item(item)).join('')}`;
  }

  setState(newItems) {
    this.todoItems = newItems;
    this.render();
  }
}
