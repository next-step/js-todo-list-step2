const loadingTemplate = () => {
  return `
    <li>
      <div class="animated-background">
        <div class="skel-mask-container">
          <div class="skel-mask"></div>
        </div>
      </div>
    </li>
  `;
};

const showLoadingBar = () => {
  const todoListElement = document.querySelector('.todo-list');
  todoListElement.innerHTML = loadingTemplate();
};

const constantMock = window.fetch;
window.fetch = function () {
  if (
    !Array.from(arguments)
      .map((arg) => {
        return !!arg.method;
      })
      .includes(true)
  ) {
    showLoadingBar();
  }
  return new Promise((resolve, reject) => {
    constantMock
      .apply(this, arguments)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(response);
      });
  });
};
