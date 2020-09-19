const observerMap = new Map();

export const observe = (target, fn) => {
  observerMap.get(target).add(fn);
}

export const observable = target => {

  return Object.keys(target).reduce((obj, key) => {
    observerMap.set(obj, new Set());
    const observers = observerMap.get(obj);
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

  }, {});

};