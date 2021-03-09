import hermes from './';

/**
 * @param {Function} method async callback for Request
 * @param  {[url:string, payload?: string]} params
 */
const errorHandler = async (method, ...params) => {
  try {
    const { data } = await method.apply(hermes, params);
    return data;
  } catch (error) {
    // do not throw, dispatch(error)
    return new Error(error);
  }
};

export default errorHandler;
