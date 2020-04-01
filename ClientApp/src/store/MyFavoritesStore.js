import _ from 'lodash';

const requestMyFavoritesType = 'MY_FAVORITES_STORE_REQUEST_MY_FAVORITES';
const receiveMyFavoritesType = 'MY_FAVORITES_STORE_RECEIVE_MY_FAVORITES';

const setSelectedObject = 'SET_SELECTED_OBJECT';

const initialState = {
    myFavorites: []
};

export const actionCreators = {
    requestMyFavoritesFunction: (libraryName, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestMyFavoritesType });

        const custID = getState().authenticationStore.authenticatedUser.user.customer_id;

        const url = `api/MyFavorites/${custID}/${libraryName}/Children`;
        const response = await fetch(url, {
            headers: { 'xAuthToken': getState().authenticationStore.authData.access_token }
        });
        if (!response.ok || response.status === 204) {
            dataReceivedCallback();
            return;
        }
        const myFavorites = await response.json();

        dispatch({ type: receiveMyFavoritesType, myFavorites });
        dataReceivedCallback(myFavorites);
    },

    setSelectedObjectFunction: (object) => async (dispatch, getState) => {
        dispatch({ type: setSelectedObject, object });
    },
}

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveMyFavoritesType) {
        return {
            ...state,
            myFavorites: action.myFavorites
        }
    }

    return state;
}