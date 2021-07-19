export default function TodoCount() {
  this.$todoCount = document.querySelector(".todo-count");

  this.setState = (countItems) => {
    const countTodos = countItems;
    this.render(countTodos);
  };

  this.render = (number) => {
    this.$todoCount.innerHTML = `총  <strong>${number}</strong> 개`
  };

}