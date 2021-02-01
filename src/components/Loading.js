const Loading = () => {
  const render = () => `
    <li>
    <div class="view">
      <label class="label">
        <div class="animated-background">
          <div class="skel-mask-container">
            <div class="skel-mask"></div>
          </div>
        </div>
      </label>
    </div>
  </li>
    `;

  return { render };
};

export default Loading;
