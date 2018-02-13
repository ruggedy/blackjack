import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from '../reducers';
import rootEpic from '../epics';

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
const epicMiddleware = createEpicMiddleware(rootEpic)


export default function configureStore(initialState = {}) {

    const middlewares = [epicMiddleware];

    const enhancers = [applyMiddleware(...middlewares)];

    const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : compose;

    const store = createStore(persistedReducer, initialState, composeEnhancers(...enhancers));
    const persistor = persistStore(store)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(persistedReducer);
        });
    }

    return {store, persistor };
}
