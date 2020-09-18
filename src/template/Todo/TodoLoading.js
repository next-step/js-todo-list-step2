const TodoLoading = () => {
  const dom = document.createElement('li');
  dom.classList.add('loading');

  const render = () => {
    dom.innerHTML = `
      <div class="view">
        <label class="label">
          <div class="animated-background">
            <div class="skel-mask-container">
              <div class="skel-mask"></div>
            </div>
          </div>
        </label>
      </div>
    `
  };

return { dom, render };
};

export default TodoLoading;