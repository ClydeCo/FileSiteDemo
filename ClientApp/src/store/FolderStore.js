import _ from 'lodash';

const requestFolderChildrenType = 'FOLDER_STORE_REQUEST_FOLDER_CHILDREN';
const receiveFolderChildrenType = 'FOLDER_STORE_RECEIVE_FOLDER_CHILDREN';
const requestFolderDocumentsType = 'FOLDER_STORE_REQUEST_FOLDER_DOCUMENTS';
const receiveFolderDocumentsType = 'FOLDER_STORE_RECEIVE_FOLDER_DOCUMENTS';

const requestFolderUpdateType = 'FOLDER_STORE_REQUEST_FOLDER_UPDATE';
const receiveFolderUpdateType = 'FOLDER_STORE_RECEIVE_FOLDER_UPDATE';

const requestFolderDeleteType = 'FOLDER_STORE_REQUEST_FOLDER_DELETE';
const receiveFolderDeleteType = 'FOLDER_STORE_RECEIVE_FOLDER_DELETE';

const refreshFoldersType = 'FOLDER_STORE_REFRESH_FOLDERS';

const requestWorkspaceChildrenType = 'FOLDER_STORE_REQUEST_WORKSPACE_CHILDREN';
const receiveWorkspaceChildrenType = 'FOLDER_STORE_RECEIVE_WORKSPACE_CHILDREN';

const setSelectedObject = 'SET_SELECTED_OBJECT';

const initialState = {
    folders: [],
    documents: []
};

export const actionCreators = {
    requestFolderChildrenFunction: (folderId, libraryName, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestFolderChildrenType, folderId });

        var existingDocuments = getState().folderStore.documents
            .filter(f => f.parent_id == folderId);

        if (existingDocuments.length > 0) {
            dataReceivedCallback();
            return;
        }

        var existingFolders = getState().folderStore.folders
            .filter(f => f.parent_id == folderId);

        if (existingFolders.length > 0) {
            dataReceivedCallback();
            return;
        }

        const custID = getState().authenticationStore.authenticatedUser.user.customer_id;
        const url = `api/Folders/${custID}/${libraryName}/${folderId}/Children`;
        const response = await fetch(url, {
            headers: { 'xAuthToken': getState().authenticationStore.authData.access_token }
        });

        if (!response.ok || response.status === 204) {
            dataReceivedCallback();
            return;
        }
        const responseData = await response.json();
        const documents = responseData.data;
        const folders = responseData.folders;

        dispatch({ type: receiveFolderChildrenType, documents, folders });
        dataReceivedCallback();
    },

    requestFolderDocumentsFunction: (folderId, libraryName, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestFolderDocumentsType, folderId });

        var existingDocuments = getState().folderStore.documents
            .filter(d => d.parent_folder_id == folderId);

        if (existingDocuments.length > 0) {
            dataReceivedCallback();
            return;
        }

        const custID = getState().authenticationStore.authenticatedUser.user.customer_id;

        const url = `api/Folders/${custID}/${libraryName}/${folderId}/Documents`;
        const response = await fetch(url, {
            headers: { 'xAuthToken': getState().authenticationStore.authData.access_token }
        });
        if (!response.ok || response.status === 204) {
            dataReceivedCallback();
            return;
        }
        const documents = await response.json();

        dispatch({ type: receiveFolderDocumentsType, documents });
        dataReceivedCallback(documents);
    },

    requestFolderUpdateFunction: (folderId, folderData, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestFolderUpdateType, folderId });

        const newFolders = getState().folderStore.folders.map(f =>
            f.folder_id === folderId
                ? folderData
                : f
        );

        dispatch({ type: receiveFolderUpdateType, newFolders, folderData });
        dataReceivedCallback(folderData);
    },

    requestFolderDeleteFunction: (folderId, folderData, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestFolderDeleteType, folderId });

        const newFolders = getState().folderStore.folders.filter(f =>
            f.folder_id !== folderId
        );

        dispatch({ type: receiveFolderDeleteType, newFolders, folderData });
        dataReceivedCallback(folderData);
    },

    requestWorkspaceChildrenFunction: (workspaceId, libraryName, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestWorkspaceChildrenType });

        var existingChildren = getState().folderStore.folders
            .filter(f => f.parent_id == workspaceId);

        if (existingChildren.length > 0) {
            dataReceivedCallback();
            return;
        }

        const custID = getState().authenticationStore.authenticatedUser.user.customer_id;

        const url = `api/Workspaces/${custID}/${libraryName}/${workspaceId}/Children`;
        const response = await fetch(url, {
            headers: { 'xAuthToken': getState().authenticationStore.authData.access_token }
        });
        if (!response.ok || response.status === 204) {
            dataReceivedCallback();
            return;
        }
        const workspaceChildren = await response.json();

        dispatch({ type: receiveWorkspaceChildrenType, workspaceChildren });
        dataReceivedCallback(workspaceChildren);
    },

    setSelectedObjectFunction: (object) => async (dispatch, getState) => {
        dispatch({ type: setSelectedObject, object });
    },
}

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestFolderChildrenType) {
        return {
            ...state
        };
    }

    if (action.type === receiveFolderChildrenType) {
        return {
            ...state,
            folders: [...state.folders, ...action.folders],
            documents: [...state.documents, ...action.documents]
        };
    }

    if (action.type === requestFolderDocumentsType) {
        return {
            ...state
        };
    }

    if (action.type === receiveFolderDocumentsType) {
        return {
            ...state,
            documents: [...state.documents, ...action.documents]
        };
    }

    if (action.type === receiveFolderUpdateType) {
        return {
            ...state,
            selectedObject: action.folderData,
            folders: [...action.newFolders]
        };
    }

    if (action.type === receiveFolderDeleteType) {
        return {
            ...state,
            selectedObject: {},
            folders: [...action.newFolders]
        };
    }

    if (action.type === refreshFoldersType) {
        return {
            ...state,
            folders: [...action.updatedFolders]
        }
    }

    if (action.type === receiveWorkspaceChildrenType) {
        return {
            ...state,
            folders: [...state.folders, ...action.workspaceChildren]
        }
    }

    return state;
}