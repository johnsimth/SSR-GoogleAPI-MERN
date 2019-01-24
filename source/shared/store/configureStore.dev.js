import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import reducer from 'shared/rootReducer';
import { createAnalytics } from 'shared/store/analytics'

export default function configureStore(initialState) {
    const finalCreateStore = compose(
        applyMiddleware(promise, createAnalytics()),
        typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f
    )(createStore);

    const store = finalCreateStore(reducer, initialState)

    return store;
}
