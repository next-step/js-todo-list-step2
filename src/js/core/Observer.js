const observerMap = new Map();

export const observe = (target, fn) => {
  observerMap.get(target).add(fn);
}

export const observable = target => {
  const observers = new Set();
  observerMap.set(target, observers);
  return Object.keys(target).reduce((obj, key) => {
    let _value = target[key];

    Object.defineProperty(obj, key, {
      get () {
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
