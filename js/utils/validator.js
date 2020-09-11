export const checkTarget = ($target) => {
    if(!$target instanceof HTMLElement) {
        throw new TypeError(`${$target} : ${MESSAGE.INVALID_HTML_ELEMENT}`)
    }
}

export const checkInstance = (target, instance) => {
    if(!target instanceof instance) {
        throw new TypeError(`${target} : ${MESSAGE.INVALID_INSTANCE}`)
    }
}