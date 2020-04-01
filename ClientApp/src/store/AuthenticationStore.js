import _ from 'lodash';

const refreshAuthenticationType = 'AUTHENTICATION_STORE_REFRESH_AUTHENTICATION';
const requestAuthenticationType = 'AUTHENTICATION_STORE_REQUEST_AUTHENTICATION';
const receiveAuthenticationType = 'AUTHENTICATION_STORE_RECEIVE_AUTHENTICATION';
const requestDiscoveryType = 'AUTHENTICATION_STORE_REQUEST_DISCOVERY';
const receiveDiscoveryType = 'AUTHENTICATION_STORE_RECEIVE_DISCOVERY';
const receiveStoredAuthenticationType = 'AUTHENTICATION_STORE_RECEIVE_STORED_AUTHENTICATION';
const requestLogoutType = 'AUTHENTICATION_STORE_REQUEST_LOGOUT';
const receiveLogoutType = 'AUTHENTICATION_STORE_RECEIVE_LOGOUT';
const loadAuthenticationFromStorage = 'AUTHENTICATION_STORE_LOAD_IN_AUTHENTICATION_FROM_STORAGE';

const initialState = {
    isAuthenticated: false,
    authData: {},
    authenticatedUser: {}
};

const getStoredAuthData = () => {
    const userString = localStorage.getItem('authData');
    try {
        return JSON.parse(userString);
    } catch (e) {
        return {};
    }
}

const getStoredAuthenticatedUser = () => {
    const userString = localStorage.getItem('authenticatedUser');
    try {
        return JSON.parse(userString);
    } catch (e) {
        return {};
    }
}

const isAlreadyAuthenticatedAndStored = () => {
    const authData = getStoredAuthData();
    const authenticatedUser = getStoredAuthenticatedUser();

    if (_.isEmpty(authData) || _.isEmpty(authenticatedUser)) {
        return false;
    }
    return true;
}

export const actionCreators = {
    requestAuthenticationFunction: (formUsername, formPassword, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestAuthenticationType, formUsername, formPassword });

        if (isAlreadyAuthenticatedAndStored()) {
            dispatch({ type: loadAuthenticationFromStorage });
            dataReceivedCallback();
            return;
        }

        const requestData = {
            username: formUsername,
            password: formPassword
        }

        console.log(JSON.stringify(requestData));

        const url = `api/Authentication`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(requestData),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok || response.status === 204) {
            dataReceivedCallback();
            return;
        }
        const authData = await response.json();

        dispatch({ type: receiveAuthenticationType, authData });
        dataReceivedCallback(authData);
    },

    requestDiscoveryFunction: (dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestDiscoveryType });

        if (isAlreadyAuthenticatedAndStored()) {
            dispatch({ type: loadAuthenticationFromStorage });
            dataReceivedCallback();
            return;
        }

        const url = `api/Authentication/Discover`;
        const response = await fetch(url, {
            headers: { 'xAuthToken': getState().authenticationStore.authData.access_token }
        });
        if (!response.ok || response.status === 204) {
            dataReceivedCallback();
            return;
        }
        const discoverObject = await response.json();

        dispatch({ type: receiveDiscoveryType, discoverObject });
        dataReceivedCallback(discoverObject);
    },

    requestLogoutFunction: () => async (dispatch) => {
        dispatch({ type: requestLogoutType });
        dispatch({ type: receiveLogoutType });
    },

    refreshAuthenticationFunction: () => async (dispatch) => {
        dispatch({ type: refreshAuthenticationType });

        localStorage.clear();

        if (isAlreadyAuthenticatedAndStored()) {
            dispatch({ type: loadAuthenticationFromStorage });
            return;
        }
    },
}

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveAuthenticationType) {
        localStorage.setItem('authData', JSON.stringify(action.authData));

        return {
            ...state,
            authData: action.authData
        };
    }

    if (action.type === receiveDiscoveryType) {
        localStorage.setItem('authenticatedUser', JSON.stringify(action.discoverObject));

        return {
            ...state,
            isAuthenticated: true,
            authenticatedUser: action.discoverObject
        };
    }

    if (action.type === receiveStoredAuthenticationType) {
        localStorage.setItem('authData', JSON.stringify(action.authData));

        return {
            ...state,
            authData: action.authData
        };
    }

    if (action.type === receiveLogoutType) {
        localStorage.clear();
        document.location.reload();
    }

    if (action.type === loadAuthenticationFromStorage) {
        const storedAuthData = getStoredAuthData();
        const storedAuthenticatedUser = getStoredAuthenticatedUser();

        return {
            ...state,
            isAuthenticated: true,
            authData: storedAuthData,
            authenticatedUser: storedAuthenticatedUser,
        };
    }

    return state;
}