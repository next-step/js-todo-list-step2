import { ERROR_MESSAGE_MAP } from "./constants.js";

export const validator = {
  isNewInstance(it, targetInstance) {
    if (!(it instanceof targetInstance)) {
      throw new Error(ERROR_MESSAGE_MAP.NOT_CREATED_BY_NEW);
    }
    return true;
  },
  isObject(it) {
    if (typeof it !== "object") {
      throw new Error(ERROR_MESSAGE_MAP.NOT_OBJECT);
    }
    return true;
  },
  isElement(it) {
    if (!(it instanceof Element)) {
      throw new Error(ERROR_MESSAGE_MAP.NOT_ELEMENT);
    }
    return true;
  },
  isArray(it) {
    if (!(it instanceof Array)) {
      throw new Error(ERROR_MESSAGE_MAP.NOT_ARRAY);
    }
    return true;
  },
  isBoolean(it) {
    if (typeof it !== "boolean") {
      throw new Error(ERROR_MESSAGE_MAP.NOT_BOOLEAN);
    }
    return true;
  },
  isString(it) {
    if (typeof it !== "string") {
      throw new Error(ERROR_MESSAGE_MAP.NOT_STRING);
    }
    return true;
  },
  isNotZeroLengthString(it) {
    if (it.length === 0) {
      throw new Error(ERROR_MESSAGE_MAP.NOT_ZERO_LENGTH);
    }
    return true;
  },
  isFunction(it) {
    if (typeof it !== "function") {
      throw new Error(ERROR_MESSAGE_MAP.NOT_FUNCTION);
    }
    return true;
  },
};
