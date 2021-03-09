import { WordService } from './Word';

export const isValid = {
  username(name) {
    return name.length > 1;
  },
};

export default isValid;
