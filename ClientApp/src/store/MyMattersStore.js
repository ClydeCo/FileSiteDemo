import _ from 'lodash';

const requestMyMattersType = 'MY_MATTERS_STORE_REQUEST_MY_MATTERS';
const receiveMyMattersType = 'MY_MATTERS_STORE_RECEIVE_MY_MATTERS';

const setSelectedObject = 'SET_SELECTED_OBJECT';

const initialState = {
    myMatters: []
};

export const actionCreators = {
    requestMyMattersFunction: (libraryName, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestMyMattersType });

        const custID = getState().authenticationStore.authenticatedUser.user.customer_id;
        const userId = getState().authenticationStore.authenticatedUser.user.id;

        const url = `api/MyMatters/${custID}/${libraryName}/${userId}/Children`;
        const response = await fetch(url, {
            headers: { 'xAuthToken': getState().authenticationStore.authData.access_token }
        });
        if (!response.ok || response.status === 204) {
            dataReceivedCallback();
            return;
        }
        const myMatters = await response.json();

        dispatch({ type: receiveMyMattersType, myMatters });
        dataReceivedCallback(myMatters);
    },

    setSelectedObjectFunction: (object) => async (dispatch, getState) => {
        dispatch({ type: setSelectedObject, object });
    },
}

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveMyMattersType) {
        return {
            ...state,
            myMatters: action.myMatters
        }
    }

    return state;
}