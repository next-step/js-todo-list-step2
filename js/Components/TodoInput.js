export default function TodoInput($target) {
  this.$target = $target;

  this.onSubmit = (e) => {
    e.preventDefault();
    const inputElem = e.target.querySelector("input");
    if (inputElem.value === "") {
      console.log("empty");
    }
    console.log(inputElem.value);
    inputElem.value = "";
  };

  this.initEventListeners = () => {
    $target.addEventListener("submit", this.onSubmit.bind(this));
  };

  this.render = () => {
    this.$target.innerHTML = `
    <label for="todo-input-form">
      <form id="todo-input-form">
        <input
          class="new-todo"
          placeholder="할 일을 입력해주세요."
          autofocus/>
      </form>
    </label>
        `;
  };

  this.render();
  this.initEventListeners();
}
