import { RETRY_COUNT } from './constants.js';

const fetchRetry = async (url, options, errorMessage, n = RETRY_COUNT) => {
  try {
    let response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('fetch retry!');
    }
    return await response.json();
  } catch (err) {
    if (n <= 1) {
      throw new Error(errorMessage);
    }
    return await fetchRetry(url, options, errorMessage, n - 1);
  }
};

export default fetchRetry;
