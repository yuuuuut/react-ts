import React from 'react';

import ReactDOM from 'react-dom';
import App from './App';

import { ConnectedRouter } from 'connected-react-router';
import * as serviceWorker  from './serviceWorker';
import createStore  from './reducks/store/store'
import {Provider}   from 'react-redux'
import * as History from 'history';

const history = History.createBrowserHistory()
export const store = createStore(history)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
