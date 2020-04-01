import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as CommonStore from './CommonStore';
import * as AuthenticationStore from './AuthenticationStore';
import * as FolderStore from './FolderStore';
import * as MyFavoritesStore from './MyFavoritesStore';
import * as MyMattersStore from './MyMattersStore';
import * as WorkspaceStore from './WorkspaceStore';
import * as DocumentStore from './DocumentStore';
import * as SearchStore from './SearchStore';

export default function configureStore(history, initialState) {
  const reducers = {
    commonStore: CommonStore.reducer,
    authenticationStore: AuthenticationStore.reducer,
    folderStore: FolderStore.reducer,
    myFavoritesStore: MyFavoritesStore.reducer,
    myMattersStore: MyMattersStore.reducer,
    workspaceStore: WorkspaceStore.reducer,
    documentStore: DocumentStore.reducer,
    searchStore: SearchStore.reducer,
  };

  const logger = createLogger({
    collapsed: true
  });

  const middleware = [
    thunk,
    routerMiddleware(history),
    logger
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
