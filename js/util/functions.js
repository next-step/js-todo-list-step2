export const backToOriginalToggle = (target) => {
  target.classList.remove('editing');
  if (target.querySelector('.toggle').checked) {
    target.classList.add('completed');
    return;
  }
};
