
const setSelectedObject = 'SET_SELECTED_OBJECT';

const initialState = {
    selectedObject: {}
};

export const actionCreators = {
    setSelectedObjectFunction: (object) => async (dispatch, getState) => {
        if (getState().commonStore.selectedObject === object) {
            return;
        }

        dispatch({ type: setSelectedObject, object });
    },
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === setSelectedObject) {
        return {
            ...state,
            selectedObject: action.object
        };
    }

    return state;
};