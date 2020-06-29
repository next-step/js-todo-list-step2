import api from '../api.js';
import { isEnterKey, isEscKey } from '../validator.js';
import { itemTemplate } from '../config/template.js';

export default class TodoList {
  constructor({ userName, $element, todoItems, onToggleItem, onDeleteItem, onEditItem }) {
    this.userName = userName;
    this.$element = $element;
    this.todoItems = todoItems;
    this.isEditingItemId = -1; // 현재 편집 중인 아이템의 id 저장

    // TODO: validation

    this.render();

    // 마우스 클릭 이벤트
    this.$element.addEventListener('click', async e => {
      // 아이템 삭제
      if (e.target.nodeName === 'BUTTON' && e.target.className === 'delete') {
        await api.deleteItem(this.userName, e.target.name);
        onDeleteItem();
        return;
      }

      // 아이템 완료/미완료 선택
      if (e.target.nodeName !== 'INPUT' || e.target.className !== 'toggle') {
        return;
      }

      // 체크 애니메이션을 위해서 html 원소 직접 접근
      const id = e.target.name;
      const $targetLi = document.querySelector(`li[id=${id}]`);
      const $targetInput = document.querySelector(`input[name="${id}"]`);
      if ($targetInput.hasAttribute('checked')) {
        $targetLi.classList.remove('completed');
        $targetInput.removeAttribute('checked');
      } else {
        $targetLi.classList.add('completed');
        $targetInput.setAttribute('checked', '');
      }

      await api.toggleItem(this.userName, id);
      onToggleItem();
    });

    const handleFinishEdit = async saveContent => {
      if (saveContent) {
        await api.modifyItem(this.userName, this.isEditingItemId, saveContent);
        this.isEditingItemId = -1;
      }
      onEditItem();
    };

    // 마우스 더블 클릭 이벤트
    this.$element.addEventListener('dblclick', e => {
      // 아이템 편집
      if (e.target.nodeName === 'LABEL') {
        const editId = e.target.htmlFor;
        this.isEditingItemId = editId;

        const $targetLi = document.querySelector(`li[id=${editId}]`);
        $targetLi.className = 'editing';

        // 편집 아이템으로 포커스
        const editInputElement = document.querySelector(`input.edit[name="${editId}"]`);
        editInputElement.focus();
      }
    });

    // 키보드 입력 이벤트
    this.$element.addEventListener('keydown', e => {
      if (this.isEditingItemId === -1) {
        return;
      }

      if (isEscKey(e)) {
        handleFinishEdit();
        return;
      }

      if (isEnterKey(e)) {
        handleFinishEdit(e.target.value.trim());
        return;
      }
    });

    this.$element.addEventListener('focusout', e => {
      if (e.target.className === 'edit') {
        handleFinishEdit();
      }
    });
  }

  render() {
    this.$element.innerHTML = `${this.todoItems.map(todoItem => itemTemplate(todoItem)).join('')}`;
  }

  setState(newItems) {
    this.todoItems = newItems;
    this.render();
  }
}
