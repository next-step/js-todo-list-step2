const createTextElement = (text) => ({
  type: 'TEXT_ELEMENT',
  props: {
    nodeValue: text,
  },
  children: [],
});

export const createElement = (type, props, ...children) => {
  if (typeof type === 'function') {
    return type({ ...props, children });
  }

  return {
    type,
    props,
    children: children.map((child) =>
      typeof child === 'object' ? child : createTextElement(child)
    ),
  };
};
