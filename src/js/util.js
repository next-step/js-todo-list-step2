
import {Message as msg} from './constant.js'

export const $ = (selector) => document.querySelector(selector)
export const utils = {
  aa : ()=> console.log('aa'),
  isValid2MoreWord: (text) => text.length >= 2
}
