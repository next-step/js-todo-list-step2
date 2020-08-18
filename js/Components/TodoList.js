import { todoItemHTML } from '../utils/template.js';
import { CLASS_NAME, NODE, SELECTOR, KEY, MESSAGE } from '../utils/constant.js';
import { checkTarget } from '../utils/validator.js';

function TodoList({
  $target,
  todoListState,
  onToggleTodo,
  onRemoveTodo,
  onEditTodo,
  onChangePriority,
}) {
  this.init = () => {
    checkTarget($target);
    this.$target = $target;

    const { name, todos, selectedTab } = todoListState;
    this.name = name;
    this.todos = todos;
    this.selectedTab = selectedTab;

    this.bindEvents();
    this.render();
  };

  this.bindEvents = () => {};

  this.setState = (nextState) => {
    const { name, todos, selectedTab } = nextState;

    this.name = name;
    this.todos = todos;
    this.selectedTab = selectedTab;
    this.isEditing = false;

    this.bindEvents();
    this.render();
  };

  this.bindEvents = () => {
    this.$target.addEventListener('click', this.onClick);
    this.$target.addEventListener('dblclick', this.onDblClick);
    this.$target.addEventListener('keydown', this.onKeyDown);
    this.$target.addEventListener('focusout', this.onFocusOut);
    this.$target.addEventListener('change', this.onChange);
  };

  this.onClick = (e) => {
    const clickedClassName = e.target.className;
    if (
      clickedClassName !== CLASS_NAME.TOGGLE &&
      clickedClassName !== CLASS_NAME.DESTROY
    ) {
      return;
    }

    const todoItemId = e.target.closest('li').id;

    if (clickedClassName == CLASS_NAME.TOGGLE) {
      onToggleTodo(this.name, todoItemId);
      return;
    }

    if (clickedClassName == CLASS_NAME.DESTROY) {
      onRemoveTodo(this.name, todoItemId);
      return;
    }
  };

  this.onDblClick = (e) => {
    if (this.isEditing) return;
    if (e.target.nodeName !== NODE.LABEL) return;

    this.isEditing = true;

    const todoItem = e.target.closest('li');
    todoItem.classList.add(CLASS_NAME.EDITING);
    todoItem.querySelector(SELECTOR.EDIT).select();
  };

  this.onKeyDown = (e) => {
    const key = e.key;

    if (key !== KEY.ENTER && key != KEY.ESC) return;

    const todoItem = e.target.closest('li');
    const editContent = e.target.value.trim();

    switch (key) {
      case KEY.ENTER:
        if (!editContent.length) {
          alert(MESSAGE.NO_INPUT_KEYWORD);
          return;
        }
        onEditTodo(this.name, todoItem.id, editContent);
        this.isEditing = false;
        return;

      case KEY.ESC:
        todoItem.classList.remove(CLASS_NAME.EDITING);
        this.isEditing = false;
        return;

      default:
        console.error(`${e.key} : ${MESSAGE.UNDEFINED_KEY}`);
        break;
    }
  };

  this.onFocusOut = (e) => {
    const todoItem = e.target.closest('li');
    todoItem.classList.remove(CLASS_NAME.EDITING);
    this.isEditing = false;
  };

  this.onChange = (e) => {
    if (e.target.nodeName !== 'SELECT') return;

    const todoItem = e.target.closest('li');
    onChangePriority(this.name, todoItem.id, e.target.value);
  };

  this.getSelectedTodos = (selectedTab) => {
    switch (selectedTab) {
      case CLASS_NAME.ALL:
        return this.todos;

      case CLASS_NAME.ACTIVE:
        return this.todos.filter(({ isCompleted }) => !isCompleted);

      case CLASS_NAME.COMPLETED:
        return this.todos.filter(({ isCompleted }) => isCompleted);

      default:
        console.error(`TodoList Render Error : ${MESSAGE.UNDEFINED_TAB}`);
        return;
    }
  };

  this.createTodoListHTML = (todos) => {
    return todos.reduce((html, todo) => {
      html += todoItemHTML(todo);
      return html;
    }, '');
  };

  this.render = () => {
    const selectedTodos = this.getSelectedTodos(this.selectedTab);
    this.$target.innerHTML = this.createTodoListHTML(selectedTodos);
  };

  this.init();
}

export default TodoList;
