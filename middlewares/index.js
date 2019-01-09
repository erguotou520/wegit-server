const auth = require('./auth')

module.exports = (fastify) => {
  auth(fastify)
}