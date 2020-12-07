export const combineReducers = (reducers) => {
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};

    reducerKeys.forEach((key) => {
        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key]
        }
    });

    const finalReducerKeys = Object.keys(finalReducers);

    return function combination(state, action) {
        let hasChanged = false;

        const nextState = {};

        finalReducerKeys.forEach((key) => {
            const reducer = finalReducers[key];
            const prevStateForKey = state[key];
            const nextStateForKey = reducer(prevStateForKey, action);

            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== prevStateForKey;
        });

        hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;

        return hasChanged ? nextState : state;
    }
};

export const createStore = (reducer) => {
    let state;
    const listeners = [];

    const getState = () => ({ ...state });

    const dispatch = (action) => {
        state = reducer(state, action);
        publish();
    };

    const publish = () => {
        listeners.forEach(({subscriber, context}) => {
            if (typeof subscriber === 'function') {
                subscriber.call(context);
            }
        });
    };

    const subscribe = (subscriber, context = null) => {
        listeners.push({
            subscriber,
            context,
        });
    };

    return {
        getState,
        dispatch,
        subscribe,
    };
};

export const createAction = (type, payload = {}) => ({
    type,
    payload: { ...payload },
});
