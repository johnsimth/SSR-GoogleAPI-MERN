'use strict'

import Prod from './configureStore.prod'
import Dev from './configureStore.dev'
console.log(process.env.NODE_ENV);
console.log(`Configuing Store for ${process.env.NODE_ENV}`)

if ("production" === process.env.NODE_ENV) {
    module.exports = Prod
} else {
    module.exports = Dev
}
