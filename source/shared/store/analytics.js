'use strict'

import ReactGA from 'react-ga'

if (typeof window !== 'undefined') {
    ReactGA.initialize('UA-76164868-1')
}

const handleAction = (store, next, action, options) => {
    if (typeof window === 'undefined' || "production" !== process.env.NODE_ENV || !action.meta || !action.meta.analytics) {
        return next(action)
    }

    const { category, actionName } = action.meta.analytics
    ReactGA.event({ category, action: actionName })

    return next(action)
}

export function createAnalytics(options = {}) {
    return store => next => action => handleAction(store, next, action, options)
}
