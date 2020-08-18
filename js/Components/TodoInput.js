export default function TodoInput($target){
  this.$target = $target;

  this.render = () => {
    this.$target.innerHTML = `
    <section class="input-container">
    <input
      class="new-todo"
      placeholder="할 일을 입력해주세요."
      autofocus/>`;
  }

  this.render();
}
