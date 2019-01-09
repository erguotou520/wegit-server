const user = require('./user')

const routes = [user]

module.exports = (fastify) => {
  fastify.register((fastify, opts, next) => {
    for (const route of routes) {
      route(fastify)
    }
    next()
  }, { prefix: '/api/v1' })
}