export default function TodoInput(inputEl, todoApp) {
  this.focusInput = () => inputEl.focus();

  this.addTodo = ({ code }) => {
    if (code !== "Enter") {
      return;
    }

    const contents = inputEl.value.trim();
    if (!contents) {
      return;
    }

    inputEl.dispatchEvent(new CompositionEvent("compositionend"));
    todoApp.addTodo(contents);
    inputEl.value = "";
  };

  this.render = () => {
    if (todoApp.editingId) {
      return;
    }

    this.focusInput();
  };

  inputEl.addEventListener("keypress", this.addTodo);
}
