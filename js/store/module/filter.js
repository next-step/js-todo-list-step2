import { FILTER } from "../../utils/constants.js";
import watch from "../../utils/watch.js";

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
    publish();
  };

  const getFilter = () => {
    return item;
  };

  const subscribe = (method) => {
    watch.subscribe("filter", method);
  };

  const publish = () => {
    watch.publish("filter");
  };

  return {
    init,
    isSameState,
    getFilter,
    setFilter,
    subscribe,
  };
})();

export default filter;
