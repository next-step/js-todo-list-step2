import Component from '../../lib/component.js';
import store from '../../store/index.js';
import { validateInput } from '../../common/validate.js';
import { listComponent } from './listComponent.js';

const List = class extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector('.todo-list'),
    });
  }

  //토글, 삭제
  toDoClick = (e) => {
    const thisToDoId = e.target.parentNode.parentNode.id;
    switch (e.target.className) {
      case 'toggle':
        store.dispatch('toggleToDo', thisToDoId);
        break;
      case 'destroy':
        store.dispatch('destroyToDo', thisToDoId);
        break;
    }
  };
  //수정
  toDoEdit = (e) => {
    const thisToDoId = e.target.parentNode.parentNode.id;
    const thisToDo = document.getElementById(thisToDoId);

    thisToDo.className = 'editing';
    thisToDo.querySelector('.edit').select();
  };

  toDoKeyup = (e) => {
    const thisToDoId = e.target.parentNode.id;
    const thisToDo = document.getElementById(thisToDoId);

    switch (e.key) {
      case 'Enter':
        if (!validateInput(e.target.value)) {
          return;
        }
        store.dispatch('editToDo', {
          itemId: thisToDoId,
          contents: e.target.value,
        });
        thisToDo.className = '';
        break;
      case 'Escape':
        thisToDo.className = '';
        break;
    }
  };

  setPriority = (e) => {
    if (e.target.nodeName !== 'SELECT') return;

    const optionValue = e.target.options[e.target.selectedIndex].value;
    let priority = '';
    switch (optionValue) {
      case '0':
        return;
      case '1':
        priority = 'FIRST';
        break;
      case '2':
        priority = 'SECOND';
        break;
    }
    const thisToDoId = e.target.parentNode.parentNode.parentNode.id;

    store.dispatch('setPriority', { itemId: thisToDoId, priority: priority });
  };

  render() {
    //로딩창
    if (store.state.isLoading) {
      this.element.innerHTML = listComponent.isLoading;
      return;
    }

    //user불러오기 실패
    if (!store.state.selectedUser) {
      this.element.innerHTML = listComponent.listMessage(
        '할 일을 추가할 수 없습니다 😥'
      );
      return;
    }

    //할 일 없을 때
    if (store.state.todos.todoList.length === 0) {
      this.element.innerHTML = listComponent.listMessage(
        '👀 할 일을 추가해주세요 👀'
      );
      return;
    }

    //버튼에 따른 할 일
    const filteredTodos = store.state.todos.todoList.filter((todo) => {
      if (store.state.filterType == 'completed') {
        return todo.isCompleted == true;
      }
      if (store.state.filterType == 'active') {
        return todo.isCompleted == false;
      }
      return todo;
    });

    //리스트 있을 때
    if (filteredTodos) {
      this.element.innerHTML = '';
      filteredTodos.map((todo) => {
        this.element.innerHTML += listComponent.listToDo(todo);
      });
    }
  }

  //이벤트 설정할 수 있게 해줌
  setEvent(target) {
    target.addEventListener('click', (e) => {
      this.toDoClick(e);
    });
    target.addEventListener('dblclick', (e) => {
      this.toDoEdit(e);
    });
    target.addEventListener('keyup', (e) => {
      this.toDoKeyup(e);
    });
    target.addEventListener('click', (e) => {
      this.setPriority(e);
    });
  }
};
export default List;
