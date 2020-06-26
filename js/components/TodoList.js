const ContentWrapper = ({ _id, contents, isCompleted }) => {
  const checked = isCompleted ? 'checked' : '';
  return `<div class="view">
      <input class="toggle" type="checkbox" name="${_id}" ${checked}/>
      <label for="${_id}">${contents}</label>
      <button class="delete" name="${_id}"></button>
    </div>`;
};

const EditInput = ({ _id, contents }) => {
  return `<input class="edit" name="${_id}" value="${contents}" autofocus/>`;
};

const Item = props => {
  const { _id, isCompleted } = props;
  const completed = isCompleted ? 'completed' : '';
  return `<li id=${_id} class="${completed}">
      ${ContentWrapper(props)}${EditInput(props)}
    </li>`;
};

export default class TodoList {
  constructor({ $element, todoItems, onToggleItem, onDeleteItem, onEditItem }) {
    this.$element = $element;
    this.todoItems = todoItems;
    this.isEditing = -1; // 현재 편집 중인 아이템의 id 저장

    // TODO: validation

    this.render();

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
      if (e.target.nodeName === 'BUTTON' && e.target.className === 'delete') {
        onDeleteItem(e.target.name);
        return;
      }
    });

    const handleFinishEdit = saveContent => {
      onEditItem(this.isEditing, saveContent);

      if (saveContent) {
        this.isEditing = -1;
      }
    };

    // 마우스 더블 클릭 이벤트
    this.$element.addEventListener('dblclick', e => {
      // 아이템 편집
      if (e.target.nodeName === 'LABEL') {
        const editId = e.target.htmlFor;
        this.isEditing = editId;

        const $targetLi = document.querySelector(`li[id=${editId}]`);
        $targetLi.className = 'editing';

        // 편집 아이템으로 포커스
        const editInputElement = document.querySelector(`input.edit[name="${editId}"]`);
        editInputElement.focus();
      }
    });

    // 키보드 입력 이벤트
    this.$element.addEventListener('keydown', e => {
      if (this.isEditing !== -1) {
        if (e.key === 'Escape') {
          handleFinishEdit();
          return;
        }

        if (e.key === 'Enter') {
          handleFinishEdit(e.target.value);
          return;
        }
      }
    });

    this.$element.addEventListener('focusout', e => {
      if (e.target.className === 'edit') {
        handleFinishEdit();
      }
    });
  }

  render() {
    this.$element.innerHTML = `${this.todoItems.map(item => Item(item)).join('')}`;
  }

  setState(newItems) {
    this.todoItems = newItems;
    this.render();
  }
}
