import React from 'react'
import { match } from 'react-router'

import renderLayout from 'server/render-layout'
import render from 'server/render'
import settings from 'server/settings'

import createRoutes from 'shared/routes'
import configureStore from 'shared/store/configureStore'

const routes = createRoutes(React)

export default (req, res) => {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
        const store = configureStore()
        const initialState = store.getState()
        const rootMarkup = render(React)(renderProps, store, req.headers['user-agent'])
        res.status(200).send(renderLayout({ settings, rootMarkup, initialState }))
    } else {
      res.status(404).send('Not found')
    }
  });
};
