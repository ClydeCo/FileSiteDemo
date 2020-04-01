import _ from 'lodash';

const requestSearchResultsType = 'SEARCH_STORE_REQUEST_SEARCH_RESULTS';
const receiveSearchResultsType = 'SEARCH_STORE_RECEIVE_SEARCH_RESULTS';

const setSelectedObject = 'SET_SELECTED_OBJECT';

const initialState = {
    searchResults: {}
};

export const actionCreators = {
    requestSearchResultsFunction: (searchName, searchType, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestSearchResultsType, searchName, searchType });

        const custID = getState().authenticationStore.authenticatedUser.user.customer_id;
        const libraryName = getState().authenticationStore.authenticatedUser.work.libraries[0].alias;

        const requestData = {
            CustomerId: custID,
            LibraryName: libraryName,
            filters: {
                name: searchName,
                type: searchType
            }
        }

        const url = `api/Documents/Search`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'xAuthToken': getState().authenticationStore.authData.access_token
            }
        });
        if (!response.ok || response.status === 204) {
            dataReceivedCallback();
            return;
        }
        const searchResults = await response.json();

        dispatch({ type: receiveSearchResultsType, searchResults });
        dataReceivedCallback(searchResults);
    },

    setSelectedObjectFunction: (object) => async (dispatch, getState) => {
        dispatch({ type: setSelectedObject, object });
    },
}

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveSearchResultsType) {
        return {
            ...state,
            searchResults: action.searchResults
        }
    }

    return state;
}