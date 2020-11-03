import { getDataAttribute } from '../utils/index.js';
import { HTML_TAG_NAMES } from '../constants/index.js';

const createElement = (tag, attr, ...children) => {
  const $el = tag
    ? document.createElement(tag)
    : document.createDocumentFragment();

  if (attr) {
    Object.entries(attr).forEach(([key, value]) => {
      if (value === false) return;

      if (key in $el) {
        $el[key] = value;
      } else {
        key.includes('data')
          ? ($el.dataset[getDataAttribute(key)] = value)
          : $el.setAttribute(key, value);
      }
    });
  }

  if (children) {
    children.map((node) => {
      if (typeof node === 'string') {
        node = document.createTextNode(node);
      }
      $el.appendChild(node);
    });
  }

  return $el;
};

export default HTML_TAG_NAMES.reduce(
  (obj, tagName) => ({
    ...obj,
    [tagName]: (attr, ...children) => createElement(tagName, attr, ...children),
  }),
  { fragment: (attr, ...children) => createElement(null, attr, ...children) }
);
