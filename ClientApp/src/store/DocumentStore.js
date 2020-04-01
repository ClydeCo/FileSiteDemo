import _ from 'lodash';

const requestDocumentDeleteType = 'DOCUMENT_STORE_REQUEST_DOCUMENT_DELETE';
const receiveDocumentDeleteType = 'DOCUMENT_STORE_RECEIVE_DOCUMENT_DELETE';

const requestEmailUpdateType = 'DOCUMENT_STORE_REQUEST_EMAIL_UPDATE';
const receiveEmailUpdateType = 'DOCUMENT_STORE_RECEIVE_EMAIL_UPDATE';

const requestEmailDeleteType = 'DOCUMENT_STORE_REQUEST_EMAIL_DELETE';
const receiveEmailDeleteType = 'DOCUMENT_STORE_RECEIVE_EMAIL_DELETE';

const requestCacheDocumentType = 'DOCUMENT_STORE_REQUEST_CACHE_DOCUMENT';
const receiveCacheDocumentType = 'DOCUMENT_STORE_RECEIVE_CACHE_DOCUMENT';

const requestDownloadDocumentType = 'DOCUMENT_STORE_REQUEST_DOWNLOAD_DOCUMENT';
const receiveDownloadDocumentType = 'DOCUMENT_STORE_RECEIVE_DOWNLOAD_DOCUMENT';

const setSelectedObject = 'SET_SELECTED_OBJECT';

const initialState = {
    loadedDocId: "",
    loadedDocUrl: ""
};

export const actionCreators = {
    requestDocumentDeleteFunction: (document_id, documentData, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestDocumentDeleteType });

        const newDocuments = getState().folderStore.documents.filter(d =>
            d.document_id !== document_id
        );

        dispatch({ type: receiveDocumentDeleteType, newDocuments });
        dataReceivedCallback(newDocuments);
    },

    requestEmailUpdateFunction: (email_id, emailData, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestEmailUpdateType, email_id });

        const newEmails = getState().commonStore.searchResults.emails.map(e =>
            e.id === email_id
                ? emailData
                : e
        );

        dispatch({ type: receiveEmailUpdateType, emailData, newEmails });
        dataReceivedCallback(newEmails);
    },

    requestEmailDeleteFunction: (email_id, emailData, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestEmailDeleteType });

        const newEmails = getState().commonStore.searchResults.emails.filter(e =>
            e.id !== email_id
        );

        dispatch({ type: receiveEmailDeleteType, newEmails });
        dataReceivedCallback(newEmails);
    },

    requestCacheDocumentFunction: (libraryName, documentId, documentName, documentExtension, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestCacheDocumentType, documentName });

        const custID = getState().authenticationStore.authenticatedUser.user.customer_id;

        const url = `api/Documents/${custID}/${libraryName}/${documentId}/Download`;
        const response = await fetch(url, {
            headers: { 'xAuthToken': getState().authenticationStore.authData.access_token }
        });
        if (!response.ok || response.status === 204) {
            console.log("FAILED TO GET DOCUMENT");
            console.log(JSON.stringify(response, null, 2));
            dataReceivedCallback();
            return;
        }
        const downloadBlob = await response.blob();

        // 2. Create blob link to download
        const blobUrl = window.URL.createObjectURL(new Blob([downloadBlob]));

        dispatch({ type: receiveCacheDocumentType, documentId, blobUrl });
        dataReceivedCallback();
    },

    requestDownloadDocumentFunction: (libraryName, documentId, documentName, documentExtension, dataReceivedCallback) => async (dispatch, getState) => {
        dispatch({ type: requestDownloadDocumentType, documentName });

        const lastDocIdCached = getState().documentStore.loadedDocId;
        if (documentId !== lastDocIdCached) {
            getState().documentStore.requestCacheDocumentFunction(libraryName, documentId, documentName, documentExtension, dataReceivedCallback);
        }

        //const downloadBlob = await response.blob();
        //const blobUrl = window.URL.createObjectURL(new Blob([downloadBlob]));
        const blobUrl = getState().documentStore.loadedDocUrl;
        const link = document.createElement('a');
        link.href = blobUrl;
        link.setAttribute('download', `${documentName}.${documentExtension}`);
        // 3. Append to html page
        document.body.appendChild(link);
        // 4. Force download
        link.click();
        // 5. Clean up and remove the link
        link.parentNode.removeChild(link);

        dispatch({ type: receiveDownloadDocumentType, documentId, blobUrl });
        dataReceivedCallback();
    },

    setSelectedObjectFunction: (object) => async (dispatch, getState) => {
        dispatch({ type: setSelectedObject, object });
    },
}

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === receiveCacheDocumentType) {
        return {
            ...state,
            loadedDocId: action.documentId,
            loadedDocUrl: action.blobUrl
        }
    }
    if (action.type === receiveDownloadDocumentType) {
        return {
            ...state,
            loadedDocId: action.documentId,
            loadedDocUrl: action.blobUrl
        }
    }
    if (action.type === receiveDocumentDeleteType) {
        return {
            ...state,
            selectedObject: {},
            documents: [...action.newDocuments]
        }
    }
    if (action.type === receiveEmailDeleteType) {
        return {
            ...state,
            selectedObject: {},
            searchResults: { ...state.searchResults, emails: action.newEmails }
        }
    }

    if (action.type === receiveEmailUpdateType) {
        return {
            ...state,
            selectedObject: action.emailData,
            searchResults: { ...state.searchResults, emails: action.newEmails }
        }
    }

    return state;
}