import { MESSAGE, TYPE } from "./constant.js"

export const checkTarget = ($target) => {
    if(!$target instanceof HTMLElement) {
        throw new TypeError(`${$target} : ${MESSAGE.INVALID_HTML_ELEMENT}`)
    }
}

export const checkType = (target, type) => {
    if(typeof target != type) {
        throw new TypeError(`${target} : ${MESSAGE.INVALID_TYPE} : ${type}`)
    }
}

export const checkInstance = (target, instance) => {
    if(!target instanceof instance) {
        throw new TypeError(`${target} : ${MESSAGE.INVALID_INSTANCE} : ${instance}`)
    }
}

export const checkArray = (target) => {
    if(!Array.isArray(target)) {
        throw new TypeError(`${target} : ${MESSAGE.NOT_ARRAY}`)
    }
}

export const checkString = (...target) => {
    checkArray(target);
    target.forEach(each => checkType(each, TYPE.STRING))
}

export const checkFunction = (func) => {
    if(!func || checkType(func, TYPE.FUNCTION)) {
        throw new TypeError(`${func} : ${MESSAGE.NOT_FUNCTION}`)
    }
}