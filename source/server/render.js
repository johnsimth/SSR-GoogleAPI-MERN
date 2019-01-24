import { renderToString } from 'react-dom/server'
import { RouterContext } from 'react-router'
import { Provider } from 'react-redux'

export default React => (renderProps, store, userAgent) => {
    return renderToString(
        <Provider store={store}>
            <RouterContext { ...renderProps } userAgent={userAgent} />
        </Provider>
  );
};
