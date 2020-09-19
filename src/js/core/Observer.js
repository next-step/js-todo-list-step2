let currentObserver = null;

export const observe = fn => {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

export const observable = target => {
  const observers = new Set();
  return Object.keys(target).reduce((obj, key) => {
    let _value = obj[key];

    Object.defineProperty(obj, key, {
      get () {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set (value) {
        _value = value;
        observers.forEach(observer => observer());
      },
    });

    return obj;

  }, target);

};
