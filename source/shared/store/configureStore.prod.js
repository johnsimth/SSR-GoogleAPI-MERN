import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from 'shared/rootReducer'
import promise from 'redux-promise'
import { createAnalytics } from 'shared/store/analytics'

// Middleware you want to use in production:
const enhancer = applyMiddleware(promise, createAnalytics())

export default function configureStore(initialState) {
    // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
    // See https://github.com/rackt/redux/releases/tag/v3.1.0
    return createStore(rootReducer, initialState, enhancer)
};
