import { KEY } from './constant.js'

export const isEnterKey = (e) => e.key === KEY.ENTER
export const isEscKey = (e) => e.key === KEY.ESC
export const isNumber = (v) => !!v && typeof v === 'number'
export const isNotEmptyString = (v) =>
  !!v && typeof v === 'string' && v.length > 0
export const isEmptyArray = (v) => !!v && Array.isArray(v) && v.length === 0
