let currentObserver = null;

export const observe = fn => {
  currentObserver = fn;
  fn();
  currentObserver = null;
}

export const observable = target => {

  return Object.keys(target).reduce((obj, key) => {
    const observers = new Set();
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
