export const createAsyncActionTypes = (type) => {
    return {
        REQUEST: type+"_REQUEST",
        SUCCESS: type+"_SUCCESS",
        FAILURE: type+"_FAILURE",
    }
};

export const createAsyncActions = (asyncActionTypes) => {
    return {
        REQUEST(payload = {}) {
            return {
                type: asyncActionTypes.REQUEST,
                payload: {
                    ...payload,
                }
            }
        },
        SUCCESS(payload = {}) {
            return {
                type: asyncActionTypes.SUCCESS,
                payload: {
                    ...payload,
                }
            }
        },
        FAILURE(payload = {}) {
            return {
                type: asyncActionTypes.FAILURE,
                payload: {
                    ...payload,
                }
            }
        },
    }
};

export const createAsyncReducers = () => {

};