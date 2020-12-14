import { FILTER } from "../../utils/constants.js";

const filter = (() => {
  let item = FILTER.ALL;

  const init = () => {
    if (location.hash.includes(FILTER.ACTIVE.state)) {
      setFilter(FILTER.ACTIVE);
    } else if (location.hash.includes(FILTER.COMPLETED.state)) {
      setFilter(FILTER.COMPLETED);
    } else {
      setFilter(FILTER.ALL);
    }
  };

  const isSameState = (state) => {
    return item.state === state;
  };

  const setFilter = (newState) => {
    item = newState;
  };

  const getFilter = () => {
    return item;
  };

  return {
    init,
    isSameState,
    getFilter,
    setFilter,
  };
})();

export default filter;
