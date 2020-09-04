const ONE_FRAME = 1000 / 60;
export const debounceOneFrame = callback => {
  let timer = null;
  return props => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(props), ONE_FRAME);
  }
}