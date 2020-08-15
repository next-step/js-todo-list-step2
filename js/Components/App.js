import TodoApp from "./TodoApp.js";

function App($target) {
  if (!new.target) {
    throw new Error("Create instance with 'new'");
  }

  this.render = () => {
    $target.innerHTML = `
        <h1>TODOS</h1>
        <main>
            <section id="todoapp" class="todoapp">
            </section>
        </main>
      `;
  };

  this.render();
  this.todoApp = new TodoApp(document.querySelector("#todoapp"));
}

export default App;
