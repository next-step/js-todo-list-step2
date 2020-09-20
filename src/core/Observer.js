let currentObserver = null;

export const observe = fn => {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

export const observable = target => {
  return Object.keys(target).reduce((obj, key) => {
    let _value = obj[key];
    const observers = new Set();
    Object.defineProperty(obj, key, {
      get ()  {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set (value) {
        if (value === _value) return;
        observers.forEach(observer => observer());
      }
    });
    return obj;
  }, target);
}
