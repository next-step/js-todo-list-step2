import {debounceOneFrame} from "../utils";

let currentObserver = null;

export const observe = observer => {
  currentObserver = debounceOneFrame(observer);
  observer();
  currentObserver = null;
}

export const observable = target => {
  return Object.keys(target).reduce((obj, key) => {
    let _value = obj[key];
    if ( typeof _value === 'object' ) _value = observable(_value);
    const observers = new Set();
    Object.defineProperty(obj, key, {
      get ()  {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set (value) {
        if (value === _value) return;
        if ( typeof value === 'object' ) value = observable(value);
        _value = value;
        observers.forEach(observer => observer());
      }
    });
    return obj;
  }, target);
}
