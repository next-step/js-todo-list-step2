export const toggleTarget = (target) => {
  if (target.querySelector('.toggle').checked) {
    target.className = 'completed';
  } else {
    target.className = '';
  }
};
