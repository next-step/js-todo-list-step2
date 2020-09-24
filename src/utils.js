export const showLoading = (boolean) => {
  const display = (boolean ? 'block' : 'none');
  const $loading = document.querySelector('.loading');
  $loading && ($loading.style.display = display);
};

export const loadingWrapper = (handler) => {
  showLoading(true);
  handler();
  showLoading(false);
};


export const createDOM = (tagName, option = {}, dataset = undefined) => {
  const dom = document.createElement(tagName);

  for (const key in option) {
    dom[key] = option[key];
  }

  if (dataset) {
    for (const data in dataset) {
      dom.dataset[data] = dataset[data];
    }
  }
  return dom;
};