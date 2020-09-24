import { createDOM } from '../../utils.js';

const TodoLoading = () => {
  const dom = createDOM(
    'li',
    {
      className: 'loading',
    },
  );

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
    `;
  };
  render();

  return dom;
};

export default TodoLoading;