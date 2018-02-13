import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import Root from './config/Root';
import configureStore from './config/configureStore'
// import rssFetch from './services/rssFetch';

const { store, persistor } = configureStore()

persistor.purge()

const render = (Component) => {
    ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Component/>
            </PersistGate>
        </Provider>
    </AppContainer>, document.getElementById('root'),);
};

render(Root);

if (module.hot) {
    module.hot.accept('./config/Root', () => {
        const newApp = require('./config/Root').default;
        render(newApp);
    });
}
