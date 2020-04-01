import _ from 'lodash';

const requestWorkspacesType = 'WORKSPACE_STORE_REQUEST_WORKSPACES';
const receiveWorkspacesType = 'WORKSPACE_STORE_RECEIVE_WORKSPACES';

const setSelectedObject = 'SET_SELECTED_OBJECT';

const initialState = {
    workspaces: []
};

export const actionCreators = {
    requestWorkspacesFunction: (libraryName, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestWorkspacesType });

        const custID = getState().authenticationStore.authenticatedUser.user.customer_id;

        const url = `api/Workspaces/${custID}/${libraryName}`;
        const response = await fetch(url, {
            headers: { 'xAuthToken': getState().authenticationStore.authData.access_token }
        });
        if (!response.ok || response.status === 204) {
            dataReceivedCallback();
            return;
        }
        const workspaces = await response.json();

        dispatch({ type: receiveWorkspacesType, workspaces });
        dataReceivedCallback(workspaces);
    },


    setSelectedObjectFunction: (object) => async (dispatch, getState) => {
        dispatch({ type: setSelectedObject, object });
    },
}

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveWorkspacesType) {
        return {
            ...state,
            workspaces: action.workspaces
        };
    }

    return state;
}