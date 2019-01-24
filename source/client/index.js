'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import createRoutes from '../shared/routes'
import configureStore from '../shared/store/configureStore'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        {createRoutes(React, browserHistory)}
    </Provider>,
    document.getElementById('root')
);
