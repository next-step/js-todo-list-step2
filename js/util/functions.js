export const toggleTarget = (target) => {
  if (target.querySelector('.toggle').checked) {
    target.classList.add('completed');
    return;
  }
  target.classList.remove('completed');
};
