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