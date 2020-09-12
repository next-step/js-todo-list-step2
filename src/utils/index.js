export const ONE_FRAME = 1000 / 60;
export const debounceOneFrame = callback => {
  let timer = null;
  return props => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(props), ONE_FRAME);
  }
}

export const lazyFrame = () => new Promise(resolve => setTimeout(resolve, ONE_FRAME * 10));

export const addEventBubblingListener = (eventType, currentTarget, selector, callback) => {
  const isChild = target => [ ...currentTarget.querySelectorAll(selector) ].includes(target) ||
                            target.closest(selector);
  currentTarget.addEventListener(eventType, event => {
    if (!isChild(event.target)) return;
    callback(event);
  })
}