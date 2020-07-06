'use strict'

if (
  typeof process !== 'undefined' &&
  process.env.NODE_ENV === 'production'
) {
  module.exports = require('./dist/cjs/statebot-mithril-hooks.min.js')
} else {
  module.exports = require('./dist/cjs/statebot-mithril-hooks.dev.js')
}
