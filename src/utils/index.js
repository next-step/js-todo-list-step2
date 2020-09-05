import { ONE_FRAME } from "../constants/index.js";

export const debounceOneFrame = callback => {
  let timer = null;
  return props => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(props), ONE_FRAME);
  }
}