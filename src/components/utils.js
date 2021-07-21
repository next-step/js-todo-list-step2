export const $ = (selector) => document.querySelector(selector);
export const $$ = (selector) => document.querySelectorAll(selector);
export const checkLength =  (contents) => {
    if (contents.length < 2) {
        alert('2글자 이상이어야 합니다')
    }
};